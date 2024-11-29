import type { LucideProps } from "lucide-react";
import React from "react";
interface CardIconsProps {
  children: React.ReactElement
  asChild?: boolean;
}

function CardIcons({ children, asChild = false }: CardIconsProps) {
  return (
    <div
      className={`${asChild ? "bg-none" : "bg-primary rounded-md shadow-inner"} p-2 w-fit max-w-fit`}
    >
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<LucideProps>, {
          size: 20,
          className: "text-primary-foreground font-bold",
        })}
    </div>
  );
}

export default CardIcons;
