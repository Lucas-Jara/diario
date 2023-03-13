import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse): void {
  res.clearPreviewData();
  res.writeHead(307, {
    location: "/",
  });
  res.end();
}
