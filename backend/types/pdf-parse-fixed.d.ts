declare module "pdf-parse-fixed" {
    import { Buffer } from "buffer";
  
    export interface PDFResult {
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      version: string;
      text: string;
    }
  
    function pdf(dataBuffer: Buffer): Promise<PDFResult>;
  
    export default pdf;
  }
  