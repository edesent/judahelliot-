import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { resolve } from "path";

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("Missing BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/upload-blob.mjs <file-path>");
  process.exit(1);
}

const fullPath = resolve(filePath);
const fileName = fullPath.split("/").pop();
console.log(`Uploading ${fileName}...`);

const fileBuffer = readFileSync(fullPath);
const blob = await put(fileName, fileBuffer, {
  access: "public",
  token,
});

console.log(`Uploaded successfully!`);
console.log(`URL: ${blob.url}`);
