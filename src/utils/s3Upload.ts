import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

export async function uploadToS3(
    file: any,
    folder: string,
    doctorId: number | string
) {
    const fileName = `${Date.now()}-${file.name}`;

    const key = `${doctorId}/${folder}/${fileName}`;

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

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}