import Login from "@/components/auth/login";
import { getDictionary } from "../../dictionaries";
interface SignInPageProp {
  params: {
    lang: string
  };
  searchParams: {
    callbackUrl: string;
    error: string;
  };
}

export default async function LoginPage({
  params: { lang },
  searchParams: { callbackUrl, error },
}: SignInPageProp) {
  const dict = await getDictionary(lang)
  return <Login dict={dict.login} />;
}
