import Login from "@/components/auth/Login";
interface SignInPageProp {
  params: object;
  searchParams: {
    callbackUrl: string;
    error: string;
  };
}

export default async function LoginPage({
  searchParams: { callbackUrl, error },
}: SignInPageProp) {
  return <Login />;
}
