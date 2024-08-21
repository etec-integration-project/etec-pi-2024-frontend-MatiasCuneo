"use server";

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { NewPassSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getResetTokenByToken } from '@/data/reset-token';
import { getUserByEmail } from '@/data/user';

export const new_password = async (
  values: z.infer<typeof NewPassSchema>,
  token: string | null
) => {
  if (!token) return { error: "El token no existe" };

  const validatedFields = NewPassSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Campos invalidos" };

  const { password, new_password } = validatedFields.data;

  const existingToken = await getResetTokenByToken(token);
  if (!existingToken) return { error: "El token es invalido" };

  const hasExpired = existingToken.expires_at < new Date();
  if (hasExpired) return { error: "El token ha expirado" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "El Email no existe" };
  
  let passwordsMatch = false;

  if (existingUser.password !== null) {
    passwordsMatch = await bcrypt.compare(password, existingUser.password);
  }

  if (!passwordsMatch) {
    console.log("Passwords didnt match: ", passwordsMatch);
    return { error: "La Contraseña actual es invalida" };
  }

  const hashedPassword = await bcrypt.hash(new_password, 10);

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  await db.passResetToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return { success: "Contraseña cambiada exitosamente!" };
};