
lifelog is a generalized information storage app.

It allows you to keep track of info in a number of different formats:
* Notes
* Todo lists
* Code snippets

Features:
* Rich text editing on notes
* Full text search across all content
* Filter by content type
* Sort by content type, creation time, updated time
* Web client can be configured to send periodic reminders

Mocks:



Architecture:

+ option 1: frontend and backend hosted all together
option 2: frontend hosted on gh pages, backend hosted separately

Technologies:

pnpm(?)
next.js https://nextjs.org/
next-auth https://next-auth.js.org/configuration/providers/credentials
react
swr https://swr.vercel.app/
bcrypt https://github.com/kelektiv/node.bcrypt.js
mongodb(?) https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
mongoose https://mongoosejs.com/

Object model:

see model.ts

API Specification:

/api/v1...

    /auth/... - auth

    ---

    GET /content - get user's content
        paginated for infinite scroll
        sort
        type

    POST /content - add content
        body contains new content

    PATCH /content - update content
        update content given content id
        partial updates supported

    ---




