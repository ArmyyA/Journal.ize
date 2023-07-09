"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <Card className="drop-shadow-lg items-center p-10 mt-32 md:max-w-2xl md:mx-auto">
      <CardTitle>Join Today</CardTitle>
      <CardDescription className="mt-3 text-base">
        Sign-in with one of the providers
      </CardDescription>
      <div className="py-4">
        <Button onClick={() => signIn("google")} className="bg-red-700 w-full">
          Sign-in with Google
        </Button>
      </div>
    </Card>
  );
}
