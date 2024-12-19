"use client";

import { useDictionary } from "@/context/DictionaryContext";
import { format } from "date-fns/format";
import Image from "next/image";
type HeaderProps = {
  title: string;
  subtitle?: string;
  generatedAt?: string;
};

export function Header({ title, subtitle, generatedAt }: HeaderProps) {
  const { dict } = useDictionary()
  return (
    <div className="flex flex-col p-4 justify-center items-center gap-3 mb-5 bg-gray-50">
      <div className="flex items-center justify-evenly w-full">
        <Image
          src="/logos/logo-go-sustainability.png"
          className="-translate-x-2.5 "
          alt="company logo"
          width={300}
          height={300}
        />
        <Image
          src={`/logos/logo-${process.env.NEXT_PUBLIC_MUNICIPALITY_SLUG}.png`}
          alt={"municiplaity logo"}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <h2 className="text-2xl font-bold">{title}</h2>

        {subtitle && <p className="text-sm max-w-2xl mt-3 mb-1 text-center">{subtitle}</p>}

        <p className="text-xs pt-2">
          {`${dict?.print?.generatedWhen} ${generatedAt || format(new Date(), "dd/MM/yyyy HH:mm")}`}
        </p>
      </div>
    </div>
  );
}
