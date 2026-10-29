import { ChatGroq } from "@langchain/groq";
import "dotenv/config";
import { answerSchema } from "../ai/schemas.ai.js";
import { answerPrompt } from "../ai/prompts.ai.js";

export const llm = new ChatGroq({
  model: process.env.GROQ_MODEL,
  apiKey: process.env.GROQ_API_KEY,
});

const llmWithStructuredOutput = llm.withStructuredOutput(answerSchema);

export const invokeLLM = async (product, candidates) => {
  const response = await answerPrompt.pipe(llmWithStructuredOutput).invoke({
    product,
    searchResults: candidates,
  });

  return response;
};
