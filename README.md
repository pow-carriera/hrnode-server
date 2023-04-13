## HRNode-server

Environment variables declared in this file are automatically made available to Prisma.
See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
See the documentation for all the connection string options: https://pris.ly/d/connection-strings

Set up PostgreSQL connection string with the .env file, which can be seen in .env.example, along with the secret key and the host name.

### Initiate the server with database migrations and client generation for Prisma.

- npm install

- npx prisma generate

- npx prisma migrate dev --name "initialize"

### Run server development mode.

- npm run dev

### Migrate the database after changes to the schema.

- npx prisma migrate dev --name "name"

### Open Prisma Studio to check for records.

- npx prisma studio

### Run Prettier and ESLint, format code and lint after.

- npm run lint
