

import { getDictionary } from "@/app/[lang]/dictionaries";
import ComprehensiveDashboard from "@/components/dashboard/dashboard";

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)
  return (
    <>
      <ComprehensiveDashboard dict={dict} />
    </>
  );
}
