"use client";

import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Textarea } from "./ui/textarea";
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

type EntryProps = {
  id?: string;
};

type CommentProps = {
  entryId?: string;
  title: string;
};

export default function Comment({ id }: EntryProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate } = useMutation(
    async (data: CommentProps) =>
      await axios.post("/api/posts/enterComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["entry-detail"]);

        toast({
          title: "Great! Comments Added Successfully 💭",
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            variant: "default",
            title: "Houston, We Have an Error!",
            description: `${error?.response?.data.message}`,
          });
          setIsDisabled(false);
        }
      },
    }
  );

  const journalizeComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ title, entryId: id });
  };

  return (
    <Card className="shadow-md mt-10">
      <CardHeader>
        <CardTitle className="text-lg">Make a comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={journalizeComment}>
          <div className="outline-none flex flex-col">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              value={title}
              placeholder="Comment away"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Button type="submit" disabled={isDisabled}>
              Comment.
            </Button>
            <p
              className={`font-semibold ${
                title.length > 300 ? "text-red-500" : "text-black"
              }`}
            >{`${title.length}/300`}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
