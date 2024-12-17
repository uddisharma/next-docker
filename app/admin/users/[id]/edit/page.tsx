import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import UserForm from "@/components/UserForm";

interface PageProps {
  params: { id: string };
}

export default async function EditUserPage({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
      <UserForm user={{ ...user, id: BigInt(user.id) }} />
    </div>
  );
}
