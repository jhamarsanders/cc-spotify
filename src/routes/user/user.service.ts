import { User } from '../../Models/User';

export class UserService {
    static async getUserPosts(userUUID: string): Promise<User> {
        const user = await User.query().findOne({ uuid: userUUID }).withGraphFetched({ posts: true });
        
        return user;
    }
}