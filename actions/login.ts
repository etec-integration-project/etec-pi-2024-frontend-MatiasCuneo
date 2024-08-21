"use server";

import * as z from 'zod';
import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { sendTwoFactorMail, sendVerificationMail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos invalidos" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email no registrado" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationMail(verificationToken.email, verificationToken.token);

    return { success: "Email de confirmacion enviado!" }
  }

  if (existingUser.isTFAEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) return { error: "Token invalido" };

      if (twoFactorToken.token !== code) return { error: "Codigo invalido" };

      const hasExpired = twoFactorToken.expires_at < new Date();

      if (hasExpired) return { error: "El codigo ha expirado" };

      await db.tFToken.delete({
        where: {
          id: twoFactorToken.id
        }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.tFConfirm.delete({
          where: {
            id: existingConfirmation.id
          }
        });
      }

      await db.tFConfirm.create({
        data: {
          userId: existingUser.id
        }
      });

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorMail(twoFactorToken.email, twoFactorToken.token);
  
      return { twoFactor: true };
    }
  } 

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    });

    return { success: "Ingreso exitoso" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales invalidas" }
        default:
          return { error: "Algo salio mal" }
      }
    }

    throw error;
  }
};