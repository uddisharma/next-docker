import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { id: BigInt(params.id) },
  });

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Our Platform`,
    description: blog.content.slice(0, 160),
  };
}

export default async function BlogPage({ params }: PageProps) {
  const blog = await prisma.blog.findUnique({
    where: { id: BigInt(params.id) },
    include: { author: true },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-muted-foreground mb-4">
        By {blog.author.firstName} {blog.author.lastName} |{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
