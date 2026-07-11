import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioUrl } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: studioUrl,
  dataset,
  projectId: projectId || "missing-project-id",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("CBF Dwarka CMS")
          .items([
            S.listItem()
              .title("Homepage Settings")
              .id("homepageSettings")
              .child(S.document().schemaType("homepageSettings").documentId("homepageSettings")),
            S.documentTypeListItem("event").title("Events"),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !["event", "homepageSettings"].includes(item.getId() || "")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  title: "CBF Dwarka CMS",
});
