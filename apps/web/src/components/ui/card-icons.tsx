import { cx } from "class-variance-authority";
import type { LucideProps } from "lucide-react";
import React from "react";
interface CardIconsProps {
  children: React.ReactElement;
  asChild?: boolean;
  className?: string;
}

function CardIcons({ children, asChild = false, className }: CardIconsProps) {
  return (
    <div
      className={`${asChild ? "bg-none" : "bg-primary rounded-md shadow-inner"} p-2 w-fit max-w-fit`}
    >
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<LucideProps>, {
          size: 20,
          className: cx(`text-primary-foreground font-bold`, className),
        })}
    </div>
  );
}

export default CardIcons;
