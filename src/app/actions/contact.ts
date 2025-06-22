"use server";

import type { ContactFormData } from "@/lib/schemas";

export async function submitContactForm(data: ContactFormData) {
  console.log("Contact form submitted:", data);
  // In a real application, you would save this to Firestore.
  // Example: await db.collection('contacts').add({ ...data, timestamp: new Date() });
  return { success: true, message: "Thank you for your message! We'll get back to you soon." };
}
