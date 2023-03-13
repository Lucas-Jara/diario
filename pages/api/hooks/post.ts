import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const signature = req.headers[SIGNATURE_HEADER_NAME]!.toString();
    if (
      !isValidSignature(
        JSON.stringify(req.body),
        signature,
        process.env.NEXT_PUBLIC_SANITY_WEBHOOK_SECRET!
      )
    )
      return res.status(401).json({ msg: "Invalid request!" });
    const { slug } = req.body;
    await res.revalidate(`/post/${slug}`);
    await res.revalidate(`/`);
    console.log("slug:", slug);
    res.status(200).json({ msg: "Post pages revalidated." });
  } catch (error) {
    res.status(401).json({ msg: "Something went wrong!" });
  }
}
