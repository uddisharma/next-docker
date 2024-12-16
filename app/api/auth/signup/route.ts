import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";
import { signupSchema } from "@/lib/schemas";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const validatedData = signupSchema.parse(userData);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: validatedData.email }, { phone: validatedData.phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or phone already exists" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await prisma.user.create({
      data: {
        ...validatedData,
        pinCode: Number(validatedData.pinCode),
        otp,
        otpExpires,
        loginType: "PHONE",
      },
    });

    await sendSMS(validatedData.phone, `Your OTP for signup is: ${otp}`);

    return NextResponse.json({
      message: "User created and OTP sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 },
      );
    }
    console.error("Error in signup:", error);
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 },
    );
  }
}
