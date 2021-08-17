import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "mysecret";

export class Encryption {
    static generatePassword(input: string): string {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(input, salt);
        return hash;
    }

    static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

    static issueJWT(payload: any): string {
        return jwt.sign(payload, secret, { expiresIn: "1d" })
    }

    static verifyJWT(token: string): any {
        return jwt.verify(token, secret, {});
    }
}