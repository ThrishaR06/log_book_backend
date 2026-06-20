import { mkdirSync, writeFileSync } from "fs";

export async function saveUploadedFile(
  file: File,
  folder: string
) {

  mkdirSync(
    `uploads/${folder}`,
    { recursive: true }
  );

  const fileName =
    `${Date.now()}-${file.name}`;

  const filePath =
    `uploads/${folder}/${fileName}`;

  const buffer =
    Buffer.from(
      await file.arrayBuffer()
    );

  writeFileSync(
    filePath,
    buffer
  );

  return filePath;
}