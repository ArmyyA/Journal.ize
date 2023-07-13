import Link from "next/link";
import Login from "./login";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import SignedIn from "./SignedIn";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-medium text-xl hover:opacity-75 transition duration-200 ease-in-out">
          Journal.ize
        </h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Link href={"/auth"}>Join Now</Link>}
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
