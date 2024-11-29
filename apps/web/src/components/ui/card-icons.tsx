import type { LucideProps } from "lucide-react";
import React from "react";
interface CardIconsProps {
  children: React.ReactElement // Expect a Lucide icon component as children
}

function CardIcons({ children }: CardIconsProps) {
  return (
    <div className="rounded-md shadow-inner bg-primary p-2 w-fit max-w-fit">
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<LucideProps>, {
          size: 20,
          className: "text-primary-foreground font-bold",
        })}
    </div>
  );
}

export default CardIcons;
