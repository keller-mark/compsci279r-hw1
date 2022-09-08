# compsci279r-hw1

To-Do App implemented using NodeJS and MongoDB based on the tutorial at https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583.


## How to open hosted version

Navigate to ? in a web browser.

## How to run locally

### Environment setup
1. Clone the repository
2. Install dependencies from NPM

```sh
npm install
```

3. Create and configure the database

Following the instructions in the tutorial:

1. Create a MongoDB Atlas account
2. Create a cluster named `todo` on the free tier
3. Add your local IP address to the allowlist
4. Create a new username/password for the cluster
5. Get the connection string
6. Set the connection string in `./.env`, replacing the `<username>` and `<password>` parts:

```
DB_CONNECT=mongodb+srv://<username>:<password>@todo.qhddaeu.mongodb.net/?retryWrites=true&w=majority
```

### Start the server

Start the web server and connect to the database by running the following in a terminal.

```sh
npm start
```