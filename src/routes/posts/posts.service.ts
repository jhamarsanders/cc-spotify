import { Post } from '../../Models/Post';

interface PostsReqObj {
    uuid?: string;
    body: string;
    user: string;
}

export class PostsService {
    static async createPost(postData: PostsReqObj, currentUser: string): Promise<Post> {
        postData.user = currentUser;
        const post = await Post.query().insert(postData);

        return post;
    }
}