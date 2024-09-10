# Store Front

This is a monorepo of a fullstack store front project for the Laserants Typescript Bootcamp

## Tech Stack

### Back-end

- Express
- Prisma
- Typescript

### Front-end

- React + Typescript
- Tailwind CSS
- GSAP

## Getting Started

### Initial Set-up

1. Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/) and get the [PostgreSQL Image](https://hub.docker.com/_/postgres).

2. Install [Volta](https://docs.volta.sh/guide/getting-started)

### Get Started

1. Clone Repo

```bash
git clone https://github.com/evelasco93/store-front.git
```

```bash
cd store-front
```

2. Install Dependencies

```bash
volta install node
```

```bash
volta install pnpm
```

3. Install Project Dependencies

```bash
pnpm install
```

4. Create a .env file with the following variables inside of Packages > database

```
POSTGRES_USER= //ANY USERNAME
POSTGRES_PASSWORD= //ANY PASSWORD
POSTGRES_DB= //ANY DB NAME
DATABASE_URL="postgresql://USERNAME-HERE:PASSWORD-HERE@localhost:5432/DB-NAME-HERE?schema=public&connect_timeout=10"
```

5. Set up your schemas

```bash
pnpm exec turbo db:generate
```

6. Star your database and seed it with test data

```bash
pnpm exec turbo db:init
```

7. Run your project (got 2 options)

```bash
pnpm exec turbo dev
```

```bash
pnpm exec turbo start
```
