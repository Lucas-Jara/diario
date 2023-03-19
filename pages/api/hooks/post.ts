import { SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { isValidSignature } from "@sanity/webhook/lib/signature";
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
    const { postSlug,categorySlug,authorSlug } = req.body;
    await res.revalidate("/");
    await res.revalidate(`/post/${postSlug}`);
    await res.revalidate(`/author/${authorSlug}`);
    for (const slug of categorySlug) {
      await res.revalidate(`/category/${slug}`);
    }
    console.log({ postSlug });
    res.status(200).json({ msg: "Post page revalidated!" });
  } catch (error) {
    res.status(401).json({ msg: "Something went Wrong!" });
  }
}
