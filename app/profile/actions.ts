"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type UserData = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
}

export async function updateProfile(userId: bigint, userData: UserData) {
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.id !== userId.toString()) {
  //   throw new Error("Unauthorized");
  // }

  const updatedUser = await prisma.user.update({
    where: { id: Number(userId) },
    data: userData,
  });

  revalidatePath("/profile");
  return updatedUser;
}

export async function deleteProfile(userId: bigint) {
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.id !== userId.toString()) {
  //   throw new Error("Unauthorized");
  // }

  await prisma.user.delete({
    where: { id: Number(userId) },
  });

  revalidatePath("/profile");
}
