import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { getDefaultDocumentNode } from "./structure";
import { myTheme } from "./theme";
import { googleMapsInput } from "@sanity/google-maps-input";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Diario",
  title: "diario-sf",

  projectId,
  dataset,

  plugins: [
    deskTool({
      defaultDocumentNode: getDefaultDocumentNode,
    }),
    googleMapsInput({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      defaultZoom: 14,
      defaultLocation: {
        "lat":-34.77791551462826,
        "lng":-58.3074189842183
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  theme: myTheme,
});
