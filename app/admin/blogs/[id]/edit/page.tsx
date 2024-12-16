import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogForm from "@/components/BlogForm";

interface PageProps {
  params: { id: string };
}

export default async function EditBlogPage({ params }: PageProps) {
  const blog = await prisma.blog.findUnique({
    where: { id: BigInt(params.id) },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Blog</h1>
      <BlogForm blog={blog} />
    </div>
  );
}
