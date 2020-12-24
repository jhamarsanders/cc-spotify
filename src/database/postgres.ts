import { Model } from 'objection';
import knex from 'knex';
import { DATABASE_CONFIG } from '../config/DatabaseHandler';

const connection = knex(DATABASE_CONFIG)

Model.knex(connection);

export { Model };