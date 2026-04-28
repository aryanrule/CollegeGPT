const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse-new");
const {getCollection} = require('../database/connectdb');
const router = express.Router();

/* storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/* only pdf */
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

/* clean text */
function cleanText(text) {
  return text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* chunk text */
function chunkText(text, size = 700, overlap = 100) {
  const chunks = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }

  return chunks;
}

/* POST /upload */
router.post(
  "/upload",
  upload.single("pdf"),
  async function (req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const filePath = req.file.path;

      const dataBuffer = fs.readFileSync(filePath);

      const data = await pdfParse(dataBuffer);

      const cleanedText = cleanText(data.text);

      const chunks = chunkText(cleanedText);

      // global.pdfChunks = chunks;
      const collection = await getCollection();
      console.log(chunks); 
      console.log(chunks[0]); 

      await collection.add({
          ids: chunks.map((_, i) => `${req.file.filename}_${i}`),
          documents: chunks,
          metadatas: chunks.map(() => ({
          source: req.file.filename,
          })),
      });

      const stored = await collection.get();
      stored.documents.forEach((doc, i) => {
      console.log("---------------");
      console.log("Chunk:", i + 1);
      console.log("ID:", stored.ids[i]);
      console.log("Text:", doc);
      console.log("Meta:", stored.metadatas[i]);
      });

          const result = await collection.query({
            queryTexts: ["skills"], 
            nResults: 3
          });

          console.log("Top Matches:");

          result.documents[0].forEach((doc, i) => {
            console.log("---------------");
            console.log("Rank:", i + 1);
            console.log("ID:", result.ids[0][i]);
            console.log("Distance:", result.distances[0][i]);
            console.log("Text:", doc);
          });

      return res.status(200).json({
        success: true,
        message: "PDF uploaded and parsed successfully",
        filename: req.file.filename,
        pages: data.numpages,
        totalChunks: chunks.length,
        preview: chunks[0],
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;