"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Journalize() {
  const router = useRouter();
  return (
    <div>
      <motion.div
        className="flex items-center gap-6"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 2 }}
      >
        <button onClick={() => router.push("/")}>
          <h1 className="font-medium text-xl hover:opacity-75 transition duration-200 ease-in-out">
            Journal.ize
          </h1>
        </button>
        <Badge variant={"outline"}>v1.0</Badge>
      </motion.div>
    </div>
  );
}
