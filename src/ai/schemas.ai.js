import { z } from "zod";

export const answerSchema = z.object({
  subject: z.literal("Produktbevakning – nya sökresultat"),
  body: z.string().describe("Mejlets innehåll som vanlig text"),
  links: z.array(
    z.object({
      title: z.string().describe("Produktens titel"),
      url: z.string().describe("Produktens URL"),
      price: z.string().describe("Produktens pris"),
      source: z.string().describe("Butikens namn"),
    }),
  ),
});
