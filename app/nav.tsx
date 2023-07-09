import Link from "next/link";
import Login from "./login";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-medium text-xl">Journal.ize</h1>
      </Link>
      <ul className="flex items-center gap-6">
        <Link href={"/auth"}>Join Now</Link>
      </ul>
    </nav>
  );
}
