import Link from "next/link";
import Login from "./login";

export default async function Nav() {
  return (
    <nav className="flex justify-between items-center py-6">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Journal.ize</h1>
      </Link>
      <ul>
        <Login />
      </ul>
    </nav>
  );
}
