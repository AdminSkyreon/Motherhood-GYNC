import fs from "fs";
import path from "path";
import type { HospitalRecord } from "@/lib/hospital-data";

const HOSPITALS_DIR = path.join(process.cwd(), "data", "hospitals");

export function getHospitalSlugs(): string[] {
  return fs
    .readdirSync(HOSPITALS_DIR)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function getHospitalBySlug(slug: string): HospitalRecord | null {
  try {
    const filePath = path.join(HOSPITALS_DIR, `${slug}.json`);
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as HospitalRecord;
  } catch {
    return null;
  }
}
