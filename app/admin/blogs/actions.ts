"use server";

import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { blogSchema, type BlogFormData } from "@/lib/schemas";

export async function addBlog(blogData: BlogFormData) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const validatedData = blogSchema.parse(blogData);

  const blog = await prisma.blog.create({
    data: {
      ...validatedData,
      authorId: BigInt(session.user.id),
    },
  });

  revalidatePath("/admin/blogs");
  return blog;
}

export async function updateBlog(id: bigint, blogData: BlogFormData) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  ) {
    throw new Error("Unauthorized");
  }

  const validatedData = blogSchema.parse(blogData);

  const blog = await prisma.blog.update({
    where: { id },
    data: validatedData,
  });

  revalidatePath("/admin/blogs");
  revalidatePath(`/admin/blogs/${id}`);
  return blog;
}

export const getBlogs = unstable_cache(
  async () => {
    return prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });
  },
  ["blogs"],
  { revalidate: 60 }, // Revalidate every 60 seconds
);
