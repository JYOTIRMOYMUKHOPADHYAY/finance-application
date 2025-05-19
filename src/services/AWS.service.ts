import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import path from "path";
import { sanitizeFileName } from "../utils/utils";
import archiver from "archiver";
import * as stream from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

    // Create ZIP archive
    const archive = archiver("zip", { zlib: { level: 9 } });
    //   const chunks: Buffer[] = [];
    //   // / Collect the ZIP data in a buffer
    // archive.on('data', (chunk) => chunks.push(chunk));
    const passThrough = new stream.PassThrough();
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const zipFileName = `files_${timestampInSeconds}.zip`;

    // Append each file to ZIP
    for (const [fieldname, fileArray] of Object.entries(files)) {
      for (const file of fileArray) {
        const sanitizedFileName = sanitizeFileName(
          path.parse(file.originalname).name
        );
        const fileExtension = path.extname(file.originalname);
        const fullFileName = `${sanitizedFileName}-${timestampInSeconds}${fileExtension}`;
        archive.append(file.buffer, { name: fullFileName });
      }
    }

    // archive.finalize();
    archive.pipe(passThrough);
    // **Important**: Wait for archive finalization to ensure all files are included
    const finalizePromise = new Promise((resolve, reject) => {
      archive.on("error", reject);
      archive.on("end", resolve);
    });

    archive.finalize(); // Start zipping process
    await finalizePromise; // Wait for it to finish
    // const zipBuffer = Buffer.concat(chunks);
    // // **Check ZIP size and contents before upload**
    // console.log(`Generated ZIP Size: ${zipBuffer.length} bytes`);
    // console.log(`ZIP Contains:`, archive.pointer(), `files`);
    // Upload ZIP to S3
    const zipKey = `${pathToUpload}/${zipFileName}`;
    try {
      const parallelUploads3 = new Upload({
        client: this.s3, // Your S3 client
        params: {
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: zipKey,
          Body: passThrough, // Streamed upload
          ContentType: "application/zip",
          Tagging: `customTag=${encodeURIComponent(customTag)}`,
        },
      });
      await parallelUploads3.done();

      return { zipFile: zipKey };
    } catch (error) {
      console.error("===== uploadMultipleFilesToS3 ERROR =====");
      console.log(error);
      throw error;
    }
  }

  async downloadFileFromS3(key: string, BUCKET_NAME: string): Promise<any> {
    try {
      const params = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key as string,
      });
      await this.s3.send(params);
      return await getSignedUrl(this.s3, params, { expiresIn: 3600 });
    } catch (error: any) {
      console.error("Error downloadFileFromS3 file:", error);
      throw error;
    }
  }
  // async uploadMultipleFilesToS3(
  //   files: Record<string, Express.Multer.File[]>,
  //   pathToUpload: string,
  //   customTag: string
  // ) {
  //   if (!files || Object.keys(files).length === 0) {
  //     throw new Error("No files provided for upload");
  //   }
  //   const archive = archiver('zip', { zlib: { level: 9 } });
  //   const passThrough = new stream.PassThrough();

  //   const uploadedFiles: Record<string, string> = {}; // To store S3 paths

  //   const uploadPromises = Object.entries(files).flatMap(
  //     ([fieldname, fileArray]) =>
  //       fileArray.map(async (file) => {
  //         const fileName = sanitizeFileName(path.parse(file.originalname).name);
  //         const timestampInSeconds =
  //           Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
  //         const fileExtension = path.extname(file.originalname);
  //         const key = `${pathToUpload}/${fieldname}/${fileName}_${timestampInSeconds}${fileExtension}`;

  //         const params = {
  //           Bucket: process.env.AWS_S3_BUCKET!,
  //           Key: key,
  //           Body: file.buffer,
  //           ContentType: file.mimetype,
  //           Tagging: `customTag=${encodeURIComponent(customTag)}`, // Adding custom tag
  //         };

  //         await this.s3.send(new PutObjectCommand(params));
  //         uploadedFiles[fieldname] = key; // Store the S3 path
  //       })
  //   );

  //   try {
  //     await Promise.all(uploadPromises);
  //     return uploadedFiles; // Returns object with { fieldname: "S3 file path" }
  //   } catch (error) {
  //     console.error("===== uploadMultipleFilesToS3 ERROR =====");
  //     console.log(error);
  //     throw error;
  //   }
  // }

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

  // async sendEmail(email_to: string, template: string): Promise<any> {
  //   try{
  //     const params = {
  //       Destination: {
  //         ToAddresses: [email_to],
  //       },
  //       Message: {
  //         Body: {
  //           Html: {
  //             Charset: "UTF-8",
  //             Data: template,
  //           },
  //         },
  //         Subject: {
  //           Charset: "UTF-8",
  //           Data: "Finance App",
  //         },
  //       },
  //       Source: process.env.EMAIL_FROM,
  //     };
  //     const command = new SendEmailCommand(params);
  //     await this.sesClient.send(command);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     throw error;
  //   }
  // }
}
