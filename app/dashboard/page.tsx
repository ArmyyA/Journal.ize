import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import DashEntry from "./DashEntry";
import { Separator } from "@/components/ui/separator";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <h1 className="font-light text-3xl">Hey there, {session.user?.name}.</h1>
      <Separator className="mt-8" />
      <h1 className="font-medium text-xl mt-10">Your Posts</h1>
      <div className="mt-5">
        <DashEntry />
      </div>
    </main>
  );
}
