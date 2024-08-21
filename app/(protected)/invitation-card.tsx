import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface InvitationCardProps {
  key_indx: number,
  content: string,
  asAdmin?: boolean
};

export const InvitationCard = ({
  key_indx,
  content,
  asAdmin
}: InvitationCardProps) => {
  const jsonContent = JSON.parse(content);
  return (
    <Link href="#">
      <Card key={key_indx} className="h-full w-[400px]">
        <CardHeader className="text-2xl font-semibold text-center">
          {asAdmin ? "Plantilla" : "Invitación"} {(key_indx + 1)+""}
        </CardHeader>
        <CardContent>
          {Object.keys(jsonContent).map((field, index) => (
            <p key={index}>{field}: {jsonContent[field]}</p>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};