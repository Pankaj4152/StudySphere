"use server";

import { revalidatePath } from "next/cache";
import { addResource } from "@/services/firestore";
import { resourceFormSchema, type ResourceFormData } from "@/lib/schemas";

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
