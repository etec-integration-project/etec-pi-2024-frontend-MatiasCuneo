"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationMail } from '@/lib/mail';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "Usuario no autorizado" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Usuario no autorizado" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.new_password = undefined;
    values.isTFAEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) return { error: "El Email ya esta en uso" };

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationMail(verificationToken.email, verificationToken.token);

    return { success: "Email de verificacion enviado!" };
  }

  if (values.password && values.new_password && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) return { error: "La contraseña es incorrecta" };

    const hashedPassword = await bcrypt.hash(values.new_password, 10);

    values.password = hashedPassword;
    values.new_password = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...values
    }
  });

  return { success: "Ajustes actualizados!" };
};