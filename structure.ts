import Iframe from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: any) =>
              doc?.slug.current
                ? `http://localhost:3000/api/preview?query=${doc.slug.current}`
                : `http://localhost:3000/api/preview`,

            defaultSize: "desktop",
            reload: {
              button: true,
            },
            attributes: {},
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
