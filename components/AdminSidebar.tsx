"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  HelpCircle,
  FileBarChart,
  User,
  Users,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/admin"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname === "/admin" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          href="/admin/blogs"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname.startsWith("/admin/blogs") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FileText className="inline-block mr-2" size={20} />
          Blogs
        </Link>
        <Link
          href="/admin/questions"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname.startsWith("/admin/questions") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <HelpCircle className="inline-block mr-2" size={20} />
          Questions
        </Link>
        <Link
          href="/admin/reports"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname.startsWith("/admin/reports") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <FileBarChart className="inline-block mr-2" size={20} />
          Reports
        </Link>
        <Link
          href="/admin/users"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname.startsWith("/admin/users") ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <Users className="inline-block mr-2" size={20} />
          Users
        </Link>
        <Link
          href="/admin/profile"
          className={`block py-2.5 px-4 rounded transition duration-200 ${pathname === "/admin/profile" ? "bg-gray-700" : "hover:bg-gray-700"}`}
        >
          <User className="inline-block mr-2" size={20} />
          Profile
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          <LogOut className="inline-block mr-2" size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
