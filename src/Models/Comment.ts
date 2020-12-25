import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { Post } from './Post';
import { Likes } from './Like';


interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class Comment extends Model {
    id!: number;
    uuid!: string;
    body!: string;
    user!: string;
    post!: string;

    static tableName = TABLE_NAMES.comments;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['user', 'body', 'post'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                body: { type: 'string' },
                user: { type: 'string' },
                post: { type: 'string' }
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
                    from: `${TABLE_NAMES.comments}.user`,
                    to: `${TABLE_NAMES.user}.uuid`
                }
            },
            postMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: `${TABLE_NAMES.comments}.post`,
                    to: `${TABLE_NAMES.posts}.uuid`
                }
            },
            likes: {
                relation: Model.HasManyRelation,
                modelClass: Likes,
                join: {
                    from: `${TABLE_NAMES.comments}.uuid`,
                    to: `${TABLE_NAMES.likes}.comment`
                }
            }
        }
    }

}