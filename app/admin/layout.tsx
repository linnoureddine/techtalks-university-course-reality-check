import type { ReactNode } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <AdminNavbar />

      <div className="flex">
        <div className="hidden md:block w-[220px]" />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
