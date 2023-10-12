import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import axios from "axios";

const options = {
  method: "POST",
  url: "https://api.cohere.ai/v1/classify",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Bearer 3RBnqUWUhmqh08wHK6ij9hMeRiMazF0mKNrXcsBH",
  },
  data: {
    truncate: "END",
    inputs: [] as string[],
    examples: [
      { text: "yo how are you", label: "benign" },
      { text: "PUDGE MID!", label: "benign" },
      { text: "I WILL REMEMBER THIS FOREVER", label: "benign" },
      { text: "I think I saw it first", label: "benign" },
      { text: "bring me a potion", label: "benign" },
      { text: "I will honestly kill you", label: "toxic" },
      { text: "get rekt moron", label: "toxic" },
      { text: "go to hell", label: "toxic" },
      { text: "f*a*g*o*t", label: "toxic" },
      { text: "you are hot trash", label: "toxic" },
      { text: "f**k you", label: "toxic" },
      { text: "fuck", label: "toxic" },
      { text: "you're a b***h", label: "toxic" },
      { text: "piss off", label: "toxic" },
      { text: "you're a dumb c**t", label: "toxic" },
      { text: "eat s**t", label: "toxic" },
      { text: "a**hole", label: "toxic" },
      { text: "screw you", label: "toxic" },
      { text: "go f**k yourself", label: "toxic" },
      { text: "you're full of crap", label: "toxic" },
      { text: "bulls**t", label: "toxic" },
      { text: "Hope you have a great day!", label: "benign" },
      { text: "Can you help me with this?", label: "benign" },
      { text: "Thanks for the advice.", label: "benign" },
      { text: "Looking forward to the weekend.", label: "benign" },
      { text: "Do you have a recommendation?", label: "benign" },
      { text: "I appreciate your effort.", label: "benign" },
      { text: "That's an interesting point of view.", label: "benign" },
      { text: "Let's catch up soon.", label: "benign" },
      { text: "How have you been lately?", label: "benign" },
      { text: "I'm glad to hear that.", label: "benign" },
    ],
  },
};

// Async API calls, allows for parallel fetching
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only handle if API request is POST
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (!session) {
      //console.log("reached");
      return res.status(401).json({ message: "You are not signed in" });
    }

    const title: string = req.body.title;

    options.data.inputs = [title];
    let input;
    try {
      const response = await axios.request(options);
      input = response.data.classifications[0].prediction;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error classifying input" });
    }

    // Fetching user using PrismaUser
    const prismaUser = await prisma.user.findUnique({
      //@ts-ignore
      where: { email: session?.user?.email },
    });

    console.log(input);

    if (input == "toxic") {
      return res.status(403).json({ message: "Woah! That's toxic 😡" });
    }

    // Title is too long, when trying to create an entry
    if (title.length > 300) {
      return res.status(403).json({ message: "Your entry is too long!" });
    }

    // Title is empty
    if (!title.length) {
      return res
        .status(403)
        .json({ message: "You haven't captured your thoughts yet!" });
    }

    // Try creating a post in post, passed title and user who created the post
    try {
      const result = await prisma.post.create({
        //@ts-ignore
        data: {
          title,
          userId: prismaUser?.id,
        },
      });

      res.status(200).json(result);

      // API handle Error
    } catch (err) {
      res.status(403).json({ err: "Unable to journalize" });
    }
  }
}
