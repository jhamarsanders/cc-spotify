import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { Encryption } from '../helpers/encryption';
import { v4 as uuid } from 'uuid';
import { Post } from './Post';
import { Follower } from './Follower';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export class User extends Model {
    id!: number;
    uuid!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;

    userJWT?: string;
    posts?: Post[];
    followers?: Follower[];
    following?: Follower[];

    static tableName = TABLE_NAMES.user;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }

    $beforeInsert(): void {
        this.password = Encryption.generatePassword(this.password);
        this.uuid = uuid();
    }

    static get relationMappings(): any {
        return {
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: `${TABLE_NAMES.user}.uuid`,
                    to: `${TABLE_NAMES.posts}.user`
                }
            },
            followers: {
                relation: Model.HasManyRelation,
                modelClass: Follower,
                join: {
                    from: `${TABLE_NAMES.user}.uuid`,
                    to: `${TABLE_NAMES.followers}.leader`
                }
            },
            following: {
                relation: Model.HasManyRelation,
                modelClass: Follower,
                join: {
                    from: `${TABLE_NAMES.user}.uuid`,
                    to: `${TABLE_NAMES.followers}.follower`
                }
            }
        }
    }

}