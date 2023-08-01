import Link from "next/link";
import Login from "./login";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import SignedIn from "./SignedIn";
import Journalize from "@/components/Journalize";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-8">
      <Journalize />
      <ul className="flex items-center gap-6">
        {!session?.user && (
          <Link className="hover:opacity-70" href={"/auth"}>
            Join Now
          </Link>
        )}
        {session?.user && (
          <SignedIn
            name={session.user?.name || ""}
            image={session.user?.image || ""}
          />
        )}
      </ul>
    </nav>
  );
}
