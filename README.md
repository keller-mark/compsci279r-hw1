# compsci279r-hw1

To-Do App implemented using NodeJS and MongoDB based on the tutorial at https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583.


## How to open hosted version

Navigate to https://peaceful-dusk-53180.herokuapp.com/ in a web browser.

## How to run locally

### Environment setup
1. Clone the repository.
2. Install dependencies from NPM:

```sh
npm install
```

3. Create and configure the database by following the instructions in the tutorial:

    1. Create a MongoDB Atlas account.
    2. Create a cluster named `todo` on the free tier.
    3. Add the IP address `0.0.0.0/0` to the allowlist.
    4. Create a new username/password for the cluster.
    5. Get the connection string.
    6. Set the connection string in `./.env`, replacing the `<username>` and `<password>` parts:

    ```
    DB_CONNECT=mongodb+srv://<username>:<password>@todo.qhddaeu.mongodb.net/?retryWrites=true&w=majority
    ```

### Start the server

Start the web server and connect to the database by running the following in a terminal:

```sh
npm start
```

### How to deploy to heroku

1. Create Heroku account
2. Install Heroku CLI:

```sh
brew tap heroku/brew && brew install heroku
```

3. Login to the CLI:

```sh
heroku login
```

4. Run app locally:

```sh
heroku local web
```

5. Deploy the app:

```sh
heroku create
git push heroku main
```

6. Add `DB_CONNECT` config variable in the Heroku dashboard for the project.

7. Check the logs:

```sh
heroku logs --tail
```

## Resources used

- https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583
- https://devcenter.heroku.com/articles/deploying-nodejs
- https://stackoverflow.com/questions/69030963/error-usefindandmodify-is-an-invalid-option
