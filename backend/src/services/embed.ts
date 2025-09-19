import fs from "fs";
import pdfParse from "pdf-parse-fixed";
import { saveDoc, Chunk } from "./vector.js";
import { pipeline } from "@xenova/transformers";

let embedder: any;

/**
 * Lazy-load the Hugging Face embedder
 */
async function getEmbedder() {
  if (!embedder) {
    console.log("⏳ Loading Hugging Face embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("✅ Embedding model loaded");
  }
  return embedder;
}

/**
 * Embed multiple texts
 */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  const model = await getEmbedder();
  const vectors: number[][] = [];

  for (const text of texts) {
    const output = await model(text);
    vectors.push(Array.from(output.data[0]));
  }

  return vectors;
}

/**
 * Embed a single text
 */
export async function embedText(text: string): Promise<number[]> {
  const [vec] = await embedTexts([text]);
  return vec;
}

/**
 * Upload and process a PDF file:
 * - Reads the PDF
 * - Splits into text chunks
 * - Embeds each chunk
 * - Saves chunks with vectors in memory
 */
export async function uploadFile(file: Express.Multer.File) {
  // 1. Read PDF
  const dataBuffer = fs.readFileSync(file.path);
  const pdfData = await pdfParse(dataBuffer);

  // 2. Extract raw text
  const rawText = pdfData.text;

  // 3. Split into chunks with IDs
  let chunks: Chunk[] = rawText
    .split(/\n\n+/)
    .map((t: string, idx: number): Chunk => ({
      id: `${file.filename}-${idx}`,
      text: t.trim(),
      page: idx + 1,
      vector: [], // placeholder
    }))
    .filter((c: Chunk) => c.text.length > 0);

  // 4. Generate embeddings for all chunks
  const vectors = await embedTexts(chunks.map((c) => c.text));
  chunks = chunks.map((c, i) => ({ ...c, vector: vectors[i] }));

  // 5. Save in memory
  saveDoc(file.filename, chunks);

  // 6. Return fileId
  return file.filename;
}

