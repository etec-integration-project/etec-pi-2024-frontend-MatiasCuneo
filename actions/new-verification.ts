"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerifTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string | null) => {
  const existingToken = await getVerifTokenByToken(token);
  
  if (!existingToken) {
    return { error: "El token no existe" };
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return { error: "El token ha expirado" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "El Email no existe" };
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return { success: "Email verificado exitosamente!" }
};