"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import * as z from 'zod';

import { sendResetMail } from "@/lib/mail";
import { generateResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "El Email es invalido" };

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: "El Email no existe" };

  const resetToken = await generateResetToken(email);
  await sendResetMail(resetToken.email, resetToken.token);

  return { success: "Email enviado!" };
};