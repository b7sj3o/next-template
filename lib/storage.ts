import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from "@aws-sdk/lib-storage";
import { v4 } from 'uuid';
import { config } from '@/config';

function getS3Client() {
    const { AWS_REGION, _AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = config;

    if (!AWS_REGION || !_AWS_ACCESS_KEY || !AWS_SECRET_ACCESS_KEY) {
        throw new Error('Missing AWS credentials');
    }

    return new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: _AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
    });
}

export async function uploadFileToS3(file: File): Promise<string> {
    const { AWS_BUCKET_NAME } = process.env;

    const extension = file.name.substring(file.name.lastIndexOf('.')) || '';
    const fileName = `${v4()}${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = new Upload({
        client: getS3Client(),
        params: {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
        },
    });

    try {
        await upload.done();
        return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error("Error uploading with Upload:", error);
        throw error;
    }
}


export async function deleteFileFromS3(fileUrl: string): Promise<void> {
    const { AWS_BUCKET_NAME } = process.env;
    const fileName = fileUrl.split("/").pop();

    if (!fileName) {
        throw new Error("Invalid file URL");
    }

    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await getS3Client().send(command);
    } catch (error) {
        console.error("Error deleting file from S3:", error);
        throw error;
    }
}
