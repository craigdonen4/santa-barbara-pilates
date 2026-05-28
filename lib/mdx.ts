import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MdxDoc = {
  slug: string;
  source: string;
  data: Record<string, unknown>;
};

export async function getMdx(filename: string): Promise<MdxDoc> {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);
  return {
    slug: filename.replace(/\.mdx?$/, ""),
    source: parsed.content,
    data: parsed.data,
  };
}

export async function listMdx(dir: string): Promise<MdxDoc[]> {
  const target = path.join(CONTENT_DIR, dir);
  let files: string[] = [];
  try {
    files = await fs.readdir(target);
  } catch {
    return [];
  }
  const docs = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(target, file), "utf-8");
        const parsed = matter(raw);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          source: parsed.content,
          data: parsed.data,
        };
      })
  );
  return docs;
}
