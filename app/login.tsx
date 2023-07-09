"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="hover:bg-slate-800 font-semibold text-xs bg-black text-white rounded-lg px-5 py-2"
      >
        Log in
      </button>
    </li>
  );
}
