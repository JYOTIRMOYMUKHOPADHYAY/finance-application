import { Request } from "express";
import multer, { FileFilterCallback, StorageEngine } from "multer";

// Define memory storage
const storage: StorageEngine = multer.memoryStorage();

// File filter function to allow only PDF and DOCX
const fileFilter = (
  req: Request<any, any, any, any>,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    const error = new Error(
      "Invalid file type. Only PDF and DOCX are allowed."
    ) as unknown as null;
    cb(error, false);
  }
};

export const upload = multer({ storage, fileFilter });
