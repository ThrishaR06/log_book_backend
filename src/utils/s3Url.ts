import {
    GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../config/s3";

export async function getImageUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
    });

    return await getSignedUrl(
        s3,
        command,
        {
            expiresIn: 60 * 60, // 1 hour
        }
    );
}