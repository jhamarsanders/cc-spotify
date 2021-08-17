import { Model } from '../database/postgres';
import { TABLE_NAMES } from '../constants/tableNames';
import { Artist } from './Artist';

interface JSONSchema {
    type: string;
    required: string[];
    properties: any;
}

export interface TrackInterface {
    id: number;
    artist_id: number;
    isrc: string;
    title: string;
    image_uri: string;
}

export class Track extends Model {
    id!: number;
    artist_id!: number;
    isrc!: string;
    title!: string;
    image_uri!: string;

    static tableName = TABLE_NAMES.track;

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['artist_id', 'isrc'],
            properties: {
                id: { type: 'integer' },
                artist_id: { type: 'integer' },
                isrc: { type: 'string' },
                title: { type: 'string' },
                image_uri: { type: 'string' }
            }
        }
    }

    static get relationMappings(): any {
        return {
            artistMap: {
                relation: Model.HasOneRelation,
                modelClass: Artist,
                join: {
                    from: `${TABLE_NAMES.track}.artist_id`,
                    to: `${TABLE_NAMES.artist}.id`
                }
            }
        }
    }
}