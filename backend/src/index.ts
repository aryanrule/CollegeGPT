import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PDFParse } from 'pdf-parse';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working Fine"
  });
});

// import { PDFParse } from 'pdf-parse';

async function run() {
	const parser = new PDFParse({ url: 'https://bitcoin.org/bitcoin.pdf' });

	const result = await parser.getText();
	console.log(result.text);
}

run();
// 

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});