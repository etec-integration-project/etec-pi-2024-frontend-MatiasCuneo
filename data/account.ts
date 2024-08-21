import { db } from "@/lib/db";

export const getAccountByUserId = async (id: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId: id
      }
    });

    return account;
  } catch (error) {
    return null;
  }
};