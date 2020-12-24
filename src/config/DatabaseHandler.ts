// Update with your config settings.

export const DATABASE_CONFIG = {
    client: 'pg',
    connection: {
        database: process.env.DATABASE_DB || 'testdb',
        user:     process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PW || 'test123'
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
  