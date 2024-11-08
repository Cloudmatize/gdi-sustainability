import Logout from "@/components/auth/Logout";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";

export default async function SignoutPage() {
  const session = await getServerSession(authOptions);
    return (
      <div>
        <div>Signout</div>
        {session?.user?.name}
        <div>Are you sure you want to sign out?</div>
        <div>
          <Logout />
        </div>
      </div>
    );
}
