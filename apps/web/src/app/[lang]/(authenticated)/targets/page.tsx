import TargetsPage from "@/components/targets/page";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: {
    lang: string
  }
}

export default async function Page({ params: { lang } }: Props) {
  const dict = await getDictionary(lang)
  return <TargetsPage dict={dict} />;
}
