
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/AdminShell";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/login/admin");
  }

  return (
    <AdminShell
      admin={{
        nombre: admin.nombre,
        username: admin.username,
      }}
    >
      {children}
    </AdminShell>
  );
}