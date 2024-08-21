import { Button } from "@/components/ui/button";
import { getInvitationsByUserId } from "@/data/invitations";
import { currentUser } from "@/lib/auth";
import Link from "next/link";
import { InvitationCard } from "../invitation-card";

const MyInvitations = async () => {
  const user = await currentUser();
  const invitations = await getInvitationsByUserId(user?.id);

  return (
    <div className='w-full h-full p-8 md:p-16 flex flex-col items-center gap-4'>
      <h1 className="text-xl md:text-2xl lg:text-4xl">Mis Invitaciones</h1>
      <div className="min-w-[50vw] h-full flex flex-wrap justify-center gap-5">
        {invitations == null && (
          <Button
            size='xlg'
            asChild
          >
            <Link href="/shop">Compra una Invitacion!</Link>
          </Button>
        ) || invitations?.map((invitation, index) => (
          <InvitationCard
            key={index}
            content={invitation.content}
          />
        ))}
      </div>
    </div>
  );
};

export default MyInvitations;