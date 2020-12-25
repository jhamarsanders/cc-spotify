import { User } from '../../Models/User';
import { UserTest } from '../constants/user';

export class CleanUp {
    static async cleanUpUser(): Promise<void> {
        await User.query().delete().where({ email: UserTest.email });
    }
}