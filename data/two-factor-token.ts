import { db } from '@/lib/db';

export const getTwoFactorTokenByToken = async (token: string | null) => {
  if (!token) return null;

  try {
    const twoFactorToken = await db.tFToken.findUnique({
      where: {
        token
      }
    });

    return twoFactorToken
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.tFToken.findFirst({
      where: {
        email
      }
    });

    return twoFactorToken
  } catch (error) {
    return null;
  }
};