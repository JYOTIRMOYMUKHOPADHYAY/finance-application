import jwt from "jsonwebtoken";

const mySecrect = process.env.JWT_SECRECT || "secret";
const expiresIn = process.env.JWT_EXPIRES_IN || 36600;
export class TokenService {
  generateToken(userData: any): string {
    return jwt.sign(userData, mySecrect, { expiresIn: Number(expiresIn)})
  }

  verifyToken(token: string): any {
    return jwt.verify(token, mySecrect);
  }
}
