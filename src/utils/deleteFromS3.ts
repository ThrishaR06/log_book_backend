import {
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../config/s3";

export async function deleteFromS3(
    key: string
) {

    await s3.send(

        new DeleteObjectCommand({

            Bucket:
                process.env.AWS_BUCKET_NAME!,

            Key: key,

        })

    );

}