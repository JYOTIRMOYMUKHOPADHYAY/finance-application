import crypto from "crypto";

// Function to hash a password
const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

// Function to verify a password
const verifyPassword = (password: string, hash: string, salt: string) => {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === hashToVerify;
};

const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/\s+/g, '_');
} 

export { hashPassword, verifyPassword, sanitizeFileName };
