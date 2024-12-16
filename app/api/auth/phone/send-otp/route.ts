import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";
import { signinSchema } from "@/lib/schemas";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    signinSchema.pick({ phone: true }).parse({ phone });

    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpires },
    });

    await sendSMS(phone, `Your OTP is: ${otp}`);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 },
      );
    }
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 },
    );
  }
}
