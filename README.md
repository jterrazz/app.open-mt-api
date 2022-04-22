# Open.MT - Open Market API

> [Open.MT](https://open.mt) is a marketplace that allows customers to discover and transact with their communities.

Learn more about us on [our blog](https://blog.open.mt/) !

## Get started

### 🌱 Dependencies

```sh
docker
node 16
yarn
```

### 🍋 Start the project !
#### Docker
```sh
yarn docker:dev
```

#### Local
```sh
# 1. Install local packages
yarn

# 2. Spawn external services
yarn docker:up

# 3. Develop with the project
yarn dev # Start API with hot reload
yarn test # Run API tests
```

### 🏗 Testing your code

The **`jest` framework** is used to run both **integration** (`/tests/e2e/*.test.ts`) and **unit** tests (`__tests__/*.test.ts`).

**The test flow starts by connecting to a Prisma database**.
The database is formatted with its latest schema (migrations from `prisma/migrations`).
A unique `PrismaClient` client is used, so that real postgres tests can be performed efficiently.

⚠️ Warnings:
- All data tested against the database can interfere with each other. Therefore, each test using the database must be thought **globally**.
- **Before and after** all tests have be processed, **the database is flushed of all its data.**

## Architecture

It follows this structure:

```bash
<root>
└ compose # docker compose configuration
└ config # configuration values
└ prisma # database schema
└ src # the application
└ tests # integrations tests
```

### App VS worker
...

### Clean architecture

The project follows **clean architecture** concepts.
Because of that, we benefit from a better separation of concerns:
the application is developed on solid abstracted interfaces and methods, and the technical implementation of this code is pushed to the side of the project.

#### The clean architecture structure

```bash
src
└ adapters
  # links the application to the external world
└ application
  # the abstracted use cases of the application
└ configuration
  # injects dependencies (technical implementations) to the abstracted application
└ domain
  # core objects of the application
└ infrastructure
  # technical implementations
```

##### 1. Adapters

It links the abstracted application to the external world. They can be of multiple types:
- presenter (for frontend applications) - App
- controllers (links an HTTP library to its handlers for example) - App
- middlewares (intermediate steps of an HTTP library) - App
- consumers - Worker

Its role is only to receive and validate the received data, format the output, and orchestrate the calls to use cases. That's all.

For example here, we connect the `koa` controllers and middlewares to our abstracted application.

##### 2. Application

The base of the applications is at the `contracts` level.
These contracts represent abstract methods of the higher levels of the application (database, external services, etc). Meaning that the implementations are never found here, but are injected at the application runtime.
The `use-cases` section will describe the behaviour of what our application can concretely do.

For example, we can:
- Register a user
- Get the details of a user
- Add a product to a shop

So it can communicate to the higher levels (DB, repositories, web) only by using interfaces.
The implementations are injected at the runtime. It can only create this logic based on the injected interfaces, and it can require the lower level: the domain.

##### 3. Domain
This layer is independent, you will never see any “require (‘…’)” to another part of the application
This layer is not be affected by external changes like routing or controllers.

##### 4. Infrastructure
This is the technical implementation of our application contracts.

> "This layer is where all the details go. The web is a detail. The database is a detail. We keep these things on the outside where they can do little harm"

##### ℹ️ The injection flow

```sh
infrastructure <=> configuration/dependencies.ts
                                  <=> adapters
                                      <=> application
                                          <=> domain
```

--- 

[***Open.MT - Wiki***](https://github.com/jterrazz/app.open-mt)

