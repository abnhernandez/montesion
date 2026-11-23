
import { redirect } from "next/navigation";
import AdminLogin from "@/components/loginAdmin";
import { getAdminSession } from "@/lib/session";

export const instant = false;

export const metadata = {
  title: "Acceso administrativo",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const admin = await getAdminSession();

  if (admin) {
    redirect("/admin");
  }

  return (
    <section className="flex min-h-[75svh] items-center justify-center bg-black px-6 py-20">
      <AdminLogin redirectTo="/admin" />
    </section>
  );
}