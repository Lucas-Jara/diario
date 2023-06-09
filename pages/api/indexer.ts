import { client } from "@/lib/sanity.client";
import algoliasearch from "algoliasearch";
import { NextApiRequest, NextApiResponse } from "next";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const index = algoliaClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await client.fetch(`*[_type == "post"]{
            "objectID": _id,
            title,
            description,
            "slug": slug.current,
            "image": mainImage.asset,
        }`);

    index.saveObjects(posts).then(({ objectIDs }) => console.log(objectIDs));

    res.status(201).json({ msg: "Todo bien!" });
  } catch (error) {
    res.status(401).json({ msg: "Algo salio mal!" });
  }
}
