"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addBlog, updateBlog } from "@/app/admin/blogs/actions";

interface BlogFormProps {
  blog?: {
    id: bigint;
    title: string;
    content: string;
    category: string;
    subCategory: string | null;
    published: boolean;
  };
}

export default function BlogForm({ blog }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const blogData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      subCategory: formData.get("subCategory") as string,
      published: formData.get("published") === "on",
    };

    try {
      if (blog) {
        await updateBlog(blog.id, blogData);
      } else {
        await addBlog(blogData);
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to submit blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={blog?.title} required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={blog?.content}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={blog?.category}
          required
        />
      </div>
      <div>
        <Label htmlFor="subCategory">Sub Category</Label>
        <Input
          id="subCategory"
          name="subCategory"
          defaultValue={blog?.subCategory || ""}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={blog?.published}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="published">Published</Label>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : blog ? "Update Blog" : "Add Blog"}
      </Button>
    </form>
  );
}
