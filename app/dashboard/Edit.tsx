"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Edit({ avatar, title, name, id, comments }: EditProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deleteEntry", { data: id }),
    {
      onError: (error) => {
        toast({
          variant: "default",
          title: "Houston, We Have an Error!",
        });
      },
      onSuccess: (data) => {
        toast({
          variant: "default",
          title: "Entry deleted successfully!",
        });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deleteEntry = () => {
    setOpen(false);
    mutate(id);
  };

  return (
    <>
      <Card className="shadow-md my-6">
        <div className="bg-white p-8 rounded-lg">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <h3 className="font-semibold">{name}</h3>
          </div>
          <div className="my-8">
            <p className="break-all">{title}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button className="text-sm font-semibold bg-red-700 hover:opacity-90">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you want to delete?</DialogTitle>
                  <DialogDescription>
                    This will permanently delete your Entry and cannot be
                    undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between gap-3">
                  <Button
                    onClick={deleteEntry}
                    className="bg-red-700 w-full hover:bg-red-800"
                  >
                    Yes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </>
  );
}
