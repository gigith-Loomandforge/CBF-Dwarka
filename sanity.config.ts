import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioUrl } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: studioUrl,
  dataset,
  projectId: projectId || "missing-project-id",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  title: "CBF Dwarka CMS",
});
