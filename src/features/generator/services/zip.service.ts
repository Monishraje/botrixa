import JSZip from "jszip";

export class ZipService {
  static async createZip(files: { path: string; content: string }[]): Promise<Buffer> {
    const zip = new JSZip();

    for (const file of files) {
      zip.file(file.path, file.content);
    }

    const content = await zip.generateAsync({ type: "nodebuffer" });
    return content;
  }
}
