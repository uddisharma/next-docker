"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchInputProps {
  defaultValue?: string;
}

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const [search, setSearch] = useState(defaultValue || "");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", e.target.value);
    searchParams.set("page", "1");
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <Input
      placeholder="Search questions..."
      value={search}
      onChange={handleSearchChange}
    />
  );
}
