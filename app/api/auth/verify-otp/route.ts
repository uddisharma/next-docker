import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { phone, otp } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (
      user.otp !== parseInt(otp) ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        otp: null,
        otpExpires: null,
      },
    });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    return NextResponse.json(
      { message: "An error occurred during OTP verification" },
      { status: 500 },
    );
  }
}
