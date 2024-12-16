import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import AdminProfileForm from "@/components/AdminProfileForm";

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  ) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: BigInt(session.user.id) },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
      <AdminProfileForm user={user} />
    </div>
  );
}
