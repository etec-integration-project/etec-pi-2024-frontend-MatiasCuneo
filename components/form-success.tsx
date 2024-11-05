import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  big?: boolean,
  message?: string
};

export const FormSuccess = ({
  message,
  big
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      {big && (
        <p className="text-2xl">{message}</p>
      ) || (
        <p>{message}</p>
      )}
    </div>
  );
};
