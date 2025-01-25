import jwt from 'jsonwebtoken';

const mySecrect = process.env.JWT_SECRECT || "secret";
const expiresIn = process.env.JWT_EXPIRES_IN || 36600;
export class TokenService {
    generateToken(userData: any): string {
        // console.log(process.env.JWT_SECRECT, process.env.JWT_EXPIRES_IN)
        const token = jwt.sign({
            exp: Number(expiresIn),
            data: userData
          }, mySecrect);

        return token;
    }
}