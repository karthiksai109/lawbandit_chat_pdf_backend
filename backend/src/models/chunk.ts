export interface Chunk {
  id: string;
  text: string;
  page: number;
  vector?: number[];
}

export default Chunk;
