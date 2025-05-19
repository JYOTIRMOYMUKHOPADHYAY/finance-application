import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const mySecrect = process.env.JWT_SECRECT || "secret";
const expiresIn = process.env.JWT_EXPIRES_IN || 36600;
const refreshTokenMySecrect = process.env.JWT_REFRESH_TOKEN_SECRECT || "secret";
const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 36600;

if(!process.env.JWT_SECRECT || !process.env.JWT_EXPIRES_IN || !process.env.JWT_REFRESH_TOKEN_SECRECT || !process.env.JWT_REFRESH_TOKEN_EXPIRES_IN) {
  throw new Error("Missing required environment variables: JWT_SECRECT, JWT_EXPIRES_IN, JWT_REFRESH_TOKEN_SECRECT, JWT_REFRESH_TOKEN_EXPIRES_IN");
}
export class TokenService {
  generateToken(userData: any): string {
    return jwt.sign(userData, mySecrect, { expiresIn: Number(expiresIn)})
  }

  verifyToken(token: string): any {
    return jwt.verify(token, mySecrect);
  }

  generateRefreshToken(userData: any): string {
    return jwt.sign(userData, refreshTokenMySecrect, { expiresIn: Number(refreshTokenExpiresIn)});
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, refreshTokenMySecrect);
  }
}
