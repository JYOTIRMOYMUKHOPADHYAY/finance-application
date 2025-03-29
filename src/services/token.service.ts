import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const mySecrect = process.env.JWT_SECRECT || "secret";
const expiresIn = process.env.JWT_EXPIRES_IN || 36600;
const refreshTokenMySecrect = process.env.JWT_REFRESH_TOKEN_SECRECT || "secret";
const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 36600;
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
