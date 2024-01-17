# Social App backend

## Install

```bash
npm install
```

## Start the server

* development:

```bash
npm run dev
```

* production:

```bash
npm run prod
```
  
* test:

```bash
npm run test
```

## Stack

* Fastify
* MongoDB with Mongoose

## Database

example

```mermaid
erDiagram
USER ||--|| ROLE: is
USER ||--o{ PUB: create
USER }o--|| PUB: like
USER {
  string email
  string passwordHash
  string username
}
ROLE {
  string name
}
PUB {
  string title
  string text
  string image_path
  date   created_at
}
```
