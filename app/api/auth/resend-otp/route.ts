import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  const { phone } = await req.json();

  try {
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
      data: {
        otp,
        otpExpires,
      },
    });

    await sendSMS(phone, `Your new OTP for signup is: ${otp}`);

    return NextResponse.json({ message: "New OTP sent successfully" });
  } catch (error) {
    console.error("Error in resending OTP:", error);
    return NextResponse.json(
      { message: "An error occurred while resending OTP" },
      { status: 500 },
    );
  }
}
