import Link from "next/link";
import Login from "./login";

export default async function Nav() {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/auth"}>
        <h1 className="font-medium text-xl">Journal.ize</h1>
      </Link>
      <ul className="flex items-center gap-6">
        <Login />
      </ul>
    </nav>
  );
}
