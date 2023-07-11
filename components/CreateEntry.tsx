"use client";

import { useState } from "react";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateEntry() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <Card className="shadow-md mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Make a Journal Entry</CardTitle>
          <CardDescription className="">
            Capture Your Thoughts, Emotions, and Experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="outline-none flex flex-col">
              <Textarea
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
                placeholder="Capture away"
              />
            </div>
            <div className="mt-6">
              <Button>Journalize.</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
