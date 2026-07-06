import {
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3";

function slugify(name: string) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

export async function getSignedFileUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
    });

    return await getSignedUrl(s3, command, {
        expiresIn: 3600,
    });
}

export async function uploadToS3(
    file: any,
    folder: string,
    doctorName: string
) {
    const doctorFolder = slugify(doctorName);

    const fileName = `${Date.now()}-${file.name}`;

    const key = `logbook/${doctorFolder}/${folder}/${fileName}`;

    let buffer: Buffer;

    // Browser File (Elysia multipart)
    if (typeof file.arrayBuffer === "function") {

        buffer = Buffer.from(await file.arrayBuffer());

    }
    // Multer / Node file
    else if (file.buffer) {

        buffer = file.buffer;

    }
    // Already a Buffer
    else if (Buffer.isBuffer(file)) {

        buffer = file;

    }
    else {

        console.log(file);

        throw new Error("Invalid file received for upload.");
    }

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    return {
        key,
        url: await getSignedFileUrl(key),
        size: buffer.length,
    };
}