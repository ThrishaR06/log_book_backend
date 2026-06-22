import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

function slugify(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

export async function uploadToS3(
    file: any,
    folder: string,
    doctorName: string
)
 {
    const fileName = `${Date.now()}-${file.name}`;

    const doctorFolder = slugify(doctorName);

const key =
  `logbook/${doctorFolder}/${folder}/${fileName}`;

   console.log("DOCTOR NAME =", doctorName);
console.log("S3 KEY =", key);

    const buffer = Buffer.from(
        await file.arrayBuffer()
    );

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    return key;
}