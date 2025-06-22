
"use server";

import { revalidatePath } from "next/cache";
import { addResource, updateResource, deleteResource } from "@/services/firestore";
import { resourceFormSchema, type ResourceFormData } from "@/lib/schemas";
import { logoutAction as performLogout } from "./login/actions";
import { redirect } from 'next/navigation';


export async function addResourceAction(data: ResourceFormData) {
  const validation = resourceFormSchema.safeParse(data);

  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => issue.message).join(", ");
    return { success: false, message: `Invalid data: ${errorMessages}` };
  }

  const result = await addResource(validation.data);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath("/");
  }

  return result;
}

export async function updateResourceAction(id: string, data: ResourceFormData) {
  const validation = resourceFormSchema.safeParse(data);

  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => issue.message).join(", ");
    return { success: false, message: `Invalid data: ${errorMessages}` };
  }

  const result = await updateResource(id, validation.data);

  if (result.success) {
    revalidatePath("/admin");
    revalidatePath("/");
  }

  return result;
}

export async function deleteResourceAction(id: string) {
    const result = await deleteResource(id);

    if (result.success) {
      revalidatePath("/admin");
      revalidatePath("/");
    }

    return result;
}

export async function logoutAndRedirectAction() {
  await performLogout();
  redirect('/admin/login');
}
