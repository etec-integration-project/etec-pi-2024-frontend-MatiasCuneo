import { db } from "@/lib/db";

export const getResetTokenByToken = async (token: string | null) => {
  if (!token) return null;

  try {
    const resetToken = await db.passResetToken.findUnique({
      where: {
        token
      }
    });

    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.passResetToken.findFirst({
      where: {
        email
      }
    });

    return resetToken;
  } catch (error) {
    return null;
  }
};