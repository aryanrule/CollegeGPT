const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const { getCollection } = require("../database/connectdb");

/* Gemini client
   Reads GEMINI_API_KEY from .env automatically
*/
const ai = new GoogleGenAI({});

/* POST /chat */
router.post("/chat", async function (req, res) {
  try {
    const { question } = req.body;

    /* validation */
    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    /* get chroma collection */
    const collection = await getCollection();

    /* semantic search */
    const result = await collection.query({
      queryTexts: [question],
      nResults: 3,
    });

    const docs = result.documents?.[0] || [];

    if (docs.length === 0) {
      return res.status(200).json({
        success: true,
        answer: "No relevant information found in uploaded documents.",
      });
    }

    /* build context */
    const context = docs.join("\n\n");

    /* prompt */
    const prompt = `
You are CollegeGPT, a helpful college assistant chatbot.

Use ONLY the provided context to answer the question.
If answer is not available in context, say:
"I could not find that in the uploaded document."

Context:
${context}

Question:
${question}

Answer:
`;

    /* Gemini response */
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return res.status(200).json({
      success: true,
      answer: response.text,
      matchedChunks: docs.length,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;