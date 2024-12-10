import TransportsPage from "@/components/transports/page";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: {
    lang: string
  }
}

export default async function Page({ params: { lang } }: Props) {
  const dict = await getDictionary(lang)
  return <TransportsPage dict={dict} />;
}


