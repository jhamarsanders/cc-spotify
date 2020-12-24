import { BadRequestError } from '../../errors';
import { Encryption } from '../../helpers/encryption';
import { User } from '../../Models/User';

interface UserReqObj {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
}

export class AuthService {
    static async login(email: string, password: string): Promise<User> {
        const existingUser = await User.query().findOne({ email });
        if(!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = Encryption.comparePassword(password, existingUser.password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        existingUser.userJWT = await Encryption.issueJWT({ uuid: existingUser.uuid, email: existingUser.email });

        return existingUser;
    }

    static async signup(userData: UserReqObj): Promise<User> {
        const existingUser = await User.query().findOne({ email: userData.email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = await User.query().insert(userData);
        const test = {
            uuid: user.uuid,
            email: user.email
        };

        user.userJWT = await Encryption.issueJWT(test);

        return user;
    }
}