import fs from "fs";
import path from "path";

const HOSPITALS_DIR = path.join(process.cwd(), "data", "hospitals");

export function getHospitalSlugs() {
  return fs
    .readdirSync(HOSPITALS_DIR)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function getHospitalBySlug(slug) {
  try {
    const filePath = path.join(HOSPITALS_DIR, `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}
