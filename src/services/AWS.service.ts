import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
export class AWSService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION, // Change to your region
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!, // Use environment variables for security
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFileToS3(file: Express.Multer.File, pathToUpload: string) {
    const fileName = path.parse(file.originalname).name;
    const timestampInSeconds = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
    const fileExtension = path.extname(file.originalname);
    const key = `${pathToUpload}/${fileName}_${timestampInSeconds}${fileExtension}`
    const params = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `${pathToUpload}/${fileName}_${timestampInSeconds}${fileExtension}`, // Ensure unique file names
      Body: file.buffer,
      ContentType: file.mimetype, // Set correct content type
    };

    try {
      const result = await this.s3.send(new PutObjectCommand(params));
      return {
        message: "File uploaded successfully",
        location: key,
      };
    } catch (error) {
      console.error("=====uploadFileToS3=======");
      console.log(error) 
      throw error;
    }
  }
}