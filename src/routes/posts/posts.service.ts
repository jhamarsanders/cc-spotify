import { Post } from '../../Models/Post';

interface PostsReqObj {
    uuid?: string;
    body: string;
    user: string;
}

export class PostsService {
    static async createPost(postData: PostsReqObj): Promise<Post> {
        const post = await Post.query().insert(postData);

        return post;
    }
}