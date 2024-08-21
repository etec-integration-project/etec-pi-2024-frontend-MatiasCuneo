import { db } from "@/lib/db";

export const getVerifTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email
      }
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerifTokenByToken = async (token: string | null) => {
  if (token) {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: {
          token
        }
      });

      return verificationToken;
    } catch (error) {
      return null;
    }
  }
  
  return null;
};