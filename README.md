# hrnode-server

Set up PostgreSQL connection string with the .env file,

## Initiate the server with

npm install

npx prisma generate

npx prisma migrate dev --name "initialize"

## Run server dev mode

npm run dev

### Migrate the database

npx prisma migrate dev --name "name"

### Open Prisma Studio

npx prisma studio

# Run Prettier

npm run lint
