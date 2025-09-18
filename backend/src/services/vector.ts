const store = new Map();

function saveDoc(docId: string, chunks: any[]) {
  store.set(docId, chunks);
}

function getDoc(docId: string) {
  return store.get(docId) ?? [];
}

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] ** 2;
    nb += b[i] ** 2;
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

function topK(docId: string, queryVec: number[], k = 5) {
  const chunks = getDoc(docId);
  return chunks
    .map((c: any) => ({ c, score: cosine(c.vector, queryVec) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(x => x.c);
}

module.exports = { saveDoc, getDoc, topK };
