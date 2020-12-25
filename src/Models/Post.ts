import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { HashtagPost } from './HashtagPost';
import { Likes } from './Like';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class Post extends Model {
    id!: number;
    uuid!: string;
    body!: string;
    user!: string;

    likes?: Likes[];

    static tableName = TABLE_NAMES.posts;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['user', 'body'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                body: { type: 'string' },
                user: { type: 'string' }
            }
        }
    }

    $beforeInsert(): void {
        this.uuid = uuid();
    }

    static get relationMappings(): any {
        return {
            userMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${TABLE_NAMES.posts}.user`,
                    to: `${TABLE_NAMES.user}.uuid`
                }
            },
            hashtagPosts: {
                relation: Model.HasManyRelation,
                modelClass: HashtagPost,
                join: {
                    from: `${TABLE_NAMES.posts}.uuid`,
                    to: `${TABLE_NAMES.hashtagPosts}.post`
                }
            },
            likes: {
                relation: Model.HasManyRelation,
                modelClass: Likes,
                join: {
                    from: `${TABLE_NAMES.posts}.uuid`,
                    to: `${TABLE_NAMES.likes}.post`
                }
            }
        }
    }

}