import { User } from '../../Models/User';
import { UserTest } from '../constants/user';

export class CreateMock {
    static async createMockUser(): Promise<User> {
        const user = await User.query().insert({ ...UserTest });

        return user;
    }
}