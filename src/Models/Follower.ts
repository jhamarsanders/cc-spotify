import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { v4 as uuid } from 'uuid';
import { User } from './User';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class Follower extends Model {
    id!: number;
    uuid!: string;
    leader!: string;
    follower!: string;

    static tableName = TABLE_NAMES.followers;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['leader', 'follower'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                leader: { type: 'string' },
                follower: { type: 'string' }
            }
        }
    }

    $beforeInsert(): void {
        this.uuid = uuid();
    }

    static get relationMappings(): any {
        return {
            leaderMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${TABLE_NAMES.followers}.leader`,
                    to: `${TABLE_NAMES.user}.uuid`
                }
            },
            followerMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${TABLE_NAMES.followers}.follower`,
                    to: `${TABLE_NAMES.user}.uuid`
                }
            }
        }
    }

}