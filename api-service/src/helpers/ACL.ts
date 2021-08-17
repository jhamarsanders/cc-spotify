import { Encryption } from './encryption';

export class ACL {
    static getTokenKey(token: string, key: string): any {
        const decoded = Encryption.verifyJWT(token);
        if (typeof decoded[key] != undefined) {
            return decoded[key];
        } else {
            return false;
        }
    }
    /**
     * Verifies if the JWT sent to the API is what is logged in the DB
     */
    static async isAuthentic(token: string): Promise<boolean> {
        const decoded = await Encryption.verifyJWT(token);
        const uuid = decoded.uuid;
        if (uuid) {
            return true;
        }
        const expires = decoded.expires;
        const now = new Date().getTime() / 1000;
        if (expires && now <= expires) {
          return true;
        }
        return false;
    }
}