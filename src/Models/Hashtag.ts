import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { HashtagPost } from './HashtagPost';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class Hashtag extends Model {
    id!: number;
    uuid!: string;
    title!: string;

    static tableName = TABLE_NAMES.hashtags;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                title: { type: 'string' }
            }
        }
    }

    $beforeInsert(): void {
        this.uuid = uuid();
    }

    static get relationMappings(): any {
        return {
            hashtagPosts: {
                relation: Model.HasManyRelation,
                modelClass: HashtagPost,
                join: {
                    from: `${TABLE_NAMES.hashtags}.uuid`,
                    to: `${TABLE_NAMES.hashtagPosts}.hashtag`
                }
            }
        }
    }

}