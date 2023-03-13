import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({});
  res.writeHead(307, {
    location: `/post/${req.query.slug}`,
  });
  res.end();
}