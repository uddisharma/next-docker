import prisma from "./prisma";

export async function generateOTP(userId: bigint): Promise<number> {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { otp, otpExpires },
  });

  return otp;
}

export async function verifyOTP(userId: bigint, otp: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user || user.otp !== otp || !user.otpExpires) {
    return false;
  }

  if (user.otpExpires < new Date()) {
    return false;
  }

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { otp: null, otpExpires: null },
  });

  return true;
}
