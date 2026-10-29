import dotenv from "dotenv";
import express from "express";
import { productWatch } from "./src/jobs/productWatch.jobs.js";

// Config
const app = express();
const PORT = 8081;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Route
app.get("/search", async (req, res) => {
  try {
    const result = await productWatch();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Search failed" });
  }
});
