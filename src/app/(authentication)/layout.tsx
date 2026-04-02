import { IChildrenProps } from "@/types";

const AuthLayout = ({ children }: IChildrenProps) => {
  return <div className="min-h-screen bg-background">{children}</div>;
};

export default AuthLayout;
