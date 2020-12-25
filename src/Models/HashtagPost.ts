import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { Hashtag } from './Hashtag';
import { Post } from './Post';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class HashtagPost extends Model {
    id!: number;
    uuid!: string;
    hashtag!: string;
    post!: string;

    static tableName = TABLE_NAMES.hashtagPosts;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['leader', 'follower'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                hashtag: { type: 'string' },
                post: { type: 'string' }
            }
        }
    }

    $beforeInsert(): void {
        this.uuid = uuid();
    }

    static get relationMappings(): any {
        return {
            hashtagMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: Hashtag,
                join: {
                    from: `${TABLE_NAMES.hashtagPosts}.hashtag`,
                    to: `${TABLE_NAMES.hashtags}.uuid`
                }
            },
            postMap: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: `${TABLE_NAMES.hashtagPosts}.post`,
                    to: `${TABLE_NAMES.posts}.uuid`
                }
            }
        }
    }

}