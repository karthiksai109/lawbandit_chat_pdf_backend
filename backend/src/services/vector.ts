export interface Chunk {
  id: string;
  text: string;
  page: number;
  vector?: number[]; // optional for embeddings
}

const store = new Map<string, Chunk[]>();

export function saveDoc(docId: string, chunks: Chunk[]): void {
  store.set(docId, chunks);
}

export function getDoc(docId: string): Chunk[] {
  return store.get(docId) ?? [];
}

function cosine(a: number[], b: number[]): number {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

export function topK(docId: string, queryVec: number[], k = 5): Chunk[] {
  const chunks = getDoc(docId);

  return chunks
    .map((c: Chunk) => ({
      c,
      // ✅ guard for undefined vectors
      score: c.vector ? cosine(c.vector, queryVec) : -Infinity,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(x => x.c);
}
