// Update with your config settings.

export const DATABASE_CONFIG = {
    client: 'pg',
    connection: {
        database: process.env.DATABASE_DB || 'UMG',
        user:     process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PW || 'test123',
        host:     process.env.DATABASE_HOST || 'localhost',
        port:     process.env.DATABSE_PORT || 5432
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
  