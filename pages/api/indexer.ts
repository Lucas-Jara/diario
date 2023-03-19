import { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import indexer, { flattenBlocks } from "sanity-algolia";
import { urlFor } from "@/lib/urlFor";
import { client } from "@/lib/sanity.client";

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex("post"),
      },
    },
    (document) => {
      switch (document._type) {
        case "post":
          return {
            title: document.title,
            path: document.slug.current,
            image: urlFor(document.mainImage).url(),
            description: document.description,
            excerpt: flattenBlocks(document.excerpt),
          };
        default:
          throw new Error(`Unknown type: ${document.type}`);
      }
    }
  );
  await sanityAlgolia.webhookSync(client, req.body);
  return res.status(200).send("ok");
}
