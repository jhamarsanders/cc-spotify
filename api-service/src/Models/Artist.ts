import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { Track } from './Track';


interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export interface ArtistInterface {
    id: number;
    name: string;
}

export class Artist extends Model {
    id!: number;
    name!: string;

    static tableName = TABLE_NAMES.artist;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
            }
        }
    }

    static get relationMappings(): any {
        return {
            trackMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: Track,
                join: {
                    from: `${TABLE_NAMES.artist}.id`,
                    to: `${TABLE_NAMES.track}.artist_id`
                }
            }
        }
    }
}