import { ReactNode } from "react";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  // if (
  //   !session ||
  //   (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  // ) {
  //   redirect("/auth/signin");
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
