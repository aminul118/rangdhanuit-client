import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Container component for public sections.
 * Standardizes the 'container mx-auto px-4 md:px-6' pattern.
 */
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-6", className)}>
      {children}
    </div>
  );
};

/**
 * Reusable Dashboard Container component.
 * Standardizes the 'w-11/12 mx-auto' pattern.
 */
export const DashboardContainer = ({ children, className }: ContainerProps) => {
  return <div className={cn("w-11/12 mx-auto", className)}>{children}</div>;
};
