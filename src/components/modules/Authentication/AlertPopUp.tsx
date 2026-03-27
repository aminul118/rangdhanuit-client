import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XIcon,
} from "lucide-react";

type Props = {
  type: "success" | "error" | "info";
  title: string;
  description: string;
  onClose: () => void;
};

const AlertPopUp = ({ type, title, description, onClose }: Props) => {
  const Icon =
    type === "success"
      ? CheckCircle2Icon
      : type === "error"
      ? AlertCircleIcon
      : InfoIcon;

  return (
    <Alert
      variant={type === "error" ? "destructive" : "default"}
      className="relative mb-4 pr-10 border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground hover:bg-zinc-800/50 absolute top-2 right-2 rounded-md p-1 transition-colors"
        aria-label="Close alert"
      >
        <XIcon className="h-4 w-4" />
      </button>

      <Icon className="h-4 w-4 text-indigo-400" />
      <AlertTitle className="text-zinc-100 font-bold">{title}</AlertTitle>
      <AlertDescription className="text-zinc-400 font-medium">
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertPopUp;
