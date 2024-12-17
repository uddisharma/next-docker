import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import BlogActions from "@/components/BlogActions";
import SearchInput from "@/components/SearchInput";
import { Prisma } from "@prisma/client";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 1;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;

  const where: Prisma.BlogWhereInput = {
    ...(search && {
      OR: [
        {
          title: { contains: search, mode: "insensitive" as Prisma.QueryMode },
        },
        {
          content: {
            contains: search,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ],
    }),
    ...(category && { category }),
  };

  const blogs = await prisma.blog.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const totalBlogs = await prisma.blog.count({ where });
  const totalPages = Math.ceil(totalBlogs / limit);

  // const categories = await prisma.blog.groupBy({
  //   by: ["category"],
  //   _count: true,
  //   orderBy: {
  //     _count: {
  //       category: "desc",
  //     },
  //   },
  // });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      <div className="mb-4 flex gap-4">
        <SearchInput defaultValue={search} />
        {/* <select
          className="border rounded p-2"
          defaultValue={category}
          onChange={(e) => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("category", e.target.value);
            searchParams.set("page", "1");
            window.location.search = searchParams.toString();
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category} ({cat._count})
            </option>
          ))}
        </select> */}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>
                {blog.author.firstName} {blog.author.lastName}
              </TableCell>
              <TableCell>{blog.category}</TableCell>
              <TableCell>{blog.published ? "Yes" : "No"}</TableCell>
              <TableCell>
                <BlogActions
                  blog={{ id: BigInt(blog.id), title: blog?.title }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Page {page} of {totalPages}
        </div>
        <div>
          {page > 1 && (
            <Link href={`/admin/blogs?page=${page - 1}`}>
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/admin/blogs?page=${page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
