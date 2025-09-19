import { pipeline } from "@xenova/transformers";

let embedder: any;

async function getEmbedder() {
  if (!embedder) {
    console.log("⏳ Loading Hugging Face embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("✅ Embedding model loaded");
  }
  return embedder;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const model = await getEmbedder();
  const vectors: number[][] = [];

  for (const text of texts) {
    const output = await model(text);
    vectors.push(Array.from(output.data[0]));
  }
  return vectors;
}

export async function embedText(text: string): Promise<number[]> {
  const [vec] = await embedTexts([text]);
  return vec;
}

export async function uploadFile(file: Express.Multer.File) {
  // TODO: implement real storage
  return file.filename;
}
