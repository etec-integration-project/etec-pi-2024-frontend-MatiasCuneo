import { db } from "@/lib/db";

export const getInvitationsByUserId = async (userId: string | undefined) => {
  try {
    const invitations = await db.userInv.findMany({
      where: {
        userId
      }
    });

    return invitations;
  } catch (error) {
    return null;
  }
};

export const getTemplatesByUserId = async (userId: string | undefined) => {
  const existingUser = await db.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!existingUser) return null;

  if (existingUser.role !== "ADMIN") return null;

  try {
    const templates = await db.designTemplate.findMany();

    return templates;
  } catch (error) {
    return null;
  }
};