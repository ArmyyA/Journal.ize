"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type User = {
  image: string;
  name: string;
  //absolute top-full right-0 mt-2
  //relative z-50
};

export default function SignedIn({ image, name }: User) {
  return (
    <li className="flex align-middle gap-5 overflow-hidden">
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none drop-shadow-md">
            <Image
              width={64}
              height={64}
              src={image}
              alt=""
              className="scale-90 outline outline-2 outline-offset-2 outline-black w-10 rounded-full hover:opacity-70 transition duration-200 ease-in-out"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <Link onClick={() => signOut()} href="/">
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
