import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (session == null) {
      //console.log("reached");
      return res.status(401).json({ message: "You are not signed in" });
    }
    const title: string = req.body.title;

    if (title.length > 300) {
      return res.status(403).json({ message: "Your entry is too long!" });
    }
    if (title.length) {
      return res
        .status(403)
        .json({ message: "You haven't captured your thoughts yet." });
    }
  }
}
