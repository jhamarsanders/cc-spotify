import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class Likes extends Model {
    id!: number;
    uuid!: string;
    post!: string;
    comment!: string;
    user!: string;

    static tableName = TABLE_NAMES.likes;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['user', ('post' || 'comment')],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                post: { type: 'string' },
                user: { type: 'string' },
                comment: { type: 'string' }
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
                    from: `${TABLE_NAMES.likes}.user`,
                    to: `${TABLE_NAMES.user}.uuid`
                }
            },
            postMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: `${TABLE_NAMES.likes}.post`,
                    to: `${TABLE_NAMES.posts}.uuid`
                }
            },
            commentMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: Comment,
                join: {
                    from: `${TABLE_NAMES.likes}.comment`,
                    to: `${TABLE_NAMES.comments}.uuid`
                }
            }
        }
    }

}