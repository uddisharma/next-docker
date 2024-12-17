"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateAdminProfile(userId: bigint, userData: any) {
  // const session = await getServerSession(authOptions);
  // if (
  //   !session ||
  //   session.user.id !== userId.toString() ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   throw new Error("Unauthorized");
  // }

  const updatedUser = await prisma.user.update({
    where: { id: Number(userId) },
    data: userData,
  });

  revalidatePath("/admin/profile");
  return updatedUser;
}
