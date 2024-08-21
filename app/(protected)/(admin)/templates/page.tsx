import { getTemplatesByUserId } from "@/data/invitations";
import { currentUser } from "@/lib/auth";
import { InvitationCard } from "../../invitation-card";

const TemplatesPage = async () => {
  const user = await currentUser();
  const templates = await getTemplatesByUserId(user?.id);

  return (
    <div className='w-full h-full p-8 md:p-16 flex flex-col items-center gap-4'>
      <h1 className="text-xl md:text-2xl lg:text-4xl">Plantillas de Invitación</h1>
      <div className="min-w-[50vw] h-full flex flex-wrap justify-center gap-5">
        {templates?.map((template, index) => (
          <InvitationCard
            key={index}
            key_indx={index}
            content={template.fields}
            asAdmin
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;