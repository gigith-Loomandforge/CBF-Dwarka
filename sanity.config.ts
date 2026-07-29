import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioUrl } from "./sanity/env";
import { OffsiteRsvpExport } from "./sanity/components/OffsiteRsvpExport";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: studioUrl,
  dataset,
  projectId: projectId || "missing-project-id",
  plugins: [
    structureTool({
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === "offsitePage") {
          return S.document().views([
            S.view.form().title("Event details"),
            S.view.component(OffsiteRsvpExport).title("RSVP Export"),
          ]);
        }

        return S.document();
      },
      structure: (S) =>
        S.list()
          .title("CBF Dwarka CMS")
          .items([
            S.listItem()
              .title("Homepage Settings")
              .id("homepageSettings")
              .child(S.document().schemaType("homepageSettings").documentId("homepageSettings")),
            S.documentTypeListItem("event").title("Events"),
            S.documentTypeListItem("offsitePage").title("Offsite Events"),
            S.documentTypeListItem("offsiteRsvp").title("Offsite RSVPs"),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !["event", "homepageSettings", "offsitePage", "offsiteRsvp"].includes(
                  item.getId() || "",
                ),
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  title: "CBF Dwarka CMS",
});
