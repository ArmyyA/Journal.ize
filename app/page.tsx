"use client";

import CreateEntry from "@/components/CreateEntry";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Entry from "@/components/Entry";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useEffect } from "react";
import { EntryType } from "./types/Entry";
import { Separator } from "@/components/ui/separator";
import { motion, Variants } from "framer-motion";

// Display all entries through fetch
const globalEntries = async () => {
  const response = await axios.get("/api/posts/getEntry");
  return response.data;
};

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 10,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};
//setProgress(66), 50
export default function Home() {
  const [progress, setProgress] = useState(10);
  const [showContents, setShowContents] = useState(false);
  const { data, error, isLoading } = useQuery<EntryType[]>({
    queryFn: globalEntries,
    queryKey: ["posts"],
  });

  // Effect for progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContents(true);
    }, 1000);

    const loadingInterval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 20, 200)); // Change this value to control the loading speed
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(loadingInterval);
    };
  }, []);

  if (error) return error;
  // Progress bar for loading
  if (!showContents || isLoading) {
    return (
      <div className="flex justify-center mt-4">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }
  return (
    <main>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
      >
        <CreateEntry />

        <Separator className="mt-10" />
        <h1 className="font-medium text-2xl mt-10">What's hot</h1>
      </motion.div>

      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.1,
          duration: 1,
          delay: 1.2,
        }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="mt-3">
          {data?.map((entry) => (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <motion.div variants={cardVariants}>
                <div className="py-3">
                  <Entry
                    key={entry.id}
                    name={entry.user.name}
                    avatar={entry.user.image}
                    entryTitle={entry.title}
                    id={entry.id}
                    comments={entry.Comment}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
