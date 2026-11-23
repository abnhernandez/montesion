
"use server";

import { redirect } from "next/navigation";
import { deleteAdminSession } from "@/lib/session";

export async function adminLogout() {
  await deleteAdminSession();
  redirect("/login/admin");
}