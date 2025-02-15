import {
  S3,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import path from "path";
import { sanitizeFileName } from "../utils/utils";
export class AWSService {
  private s3: S3;
  private snsClient: SNSClient;
  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION, // Change to your region
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!, // Use environment variables for security
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    this.snsClient = new SNSClient({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFileToS3(file: Express.Multer.File, pathToUpload: string) {
    const fileName = sanitizeFileName(path.parse(file.originalname).name);
    const timestampInSeconds =
      Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
    const fileExtension = path.extname(file.originalname);
    const key = `${pathToUpload}/${fileName}_${timestampInSeconds}${fileExtension}`;
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
      console.log(error);
      throw error;
    }
  }

  async uploadMultipleFilesToS3(
    files: Record<string, Express.Multer.File[]>,
    pathToUpload: string,
    customTag: string
  ) {
    if (!files || Object.keys(files).length === 0) {
      throw new Error("No files provided for upload");
    }

    const uploadedFiles: Record<string, string> = {}; // To store S3 paths

    const uploadPromises = Object.entries(files).flatMap(
      ([fieldname, fileArray]) =>
        fileArray.map(async (file) => {
          const fileName = sanitizeFileName(path.parse(file.originalname).name);
          const timestampInSeconds =
            Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
          const fileExtension = path.extname(file.originalname);
          const key = `${pathToUpload}/${fieldname}/${fileName}_${timestampInSeconds}${fileExtension}`;

          const params = {
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            Tagging: `customTag=${encodeURIComponent(customTag)}`, // Adding custom tag
          };

          await this.s3.send(new PutObjectCommand(params));
          uploadedFiles[fieldname] = key; // Store the S3 path
        })
    );

    try {
      await Promise.all(uploadPromises);
      return uploadedFiles; // Returns object with { fieldname: "S3 file path" }
    } catch (error) {
      console.error("===== uploadMultipleFilesToS3 ERROR =====");
      console.log(error);
      throw error;
    }
  }

  async sendOTPusingSNS(phoneNumber: string, otp: string): Promise<any> {
    try {
      const params = {
        Message: `Your OTP code is: ${otp} Please do not share with anyone. It will expire in 5 minutes.`,
        PhoneNumber: phoneNumber,
        MessageAttributes: {
          "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "FinanceApp",
          },
          "AWS.SNS.SMS.SMSType": {
            DataType: "String",
            StringValue: "Transactional",
          },
        },
      };
      const command = new PublishCommand(params);
      await this.snsClient.send(command);
      return otp; // Store OTP for verification
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  }
}