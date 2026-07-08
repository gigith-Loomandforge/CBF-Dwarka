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
            S.documentTypeListItem("event").title("Events"),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== "event"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  title: "CBF Dwarka CMS",
});
