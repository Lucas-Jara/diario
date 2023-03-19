import { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import sanityClient from "@sanity/client";
import indexer, { flattenBlocks } from "sanity-algolia";
import { urlFor } from "@/lib/urlFor";

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const sanity = sanityClient({
  apiVersion:"2022-08-12"
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send("ok"));
}
