# fcc-google-api

## Branches
- `master`: The current setup only accepts a Google login


## npm dependencies
- `express`: Routing, Middleware
- `mongoose`: Schema models connected to MongoDB
- `body-parser`: Turns incoming requests into JSON data
- `morgan`: Logger for server messages during development
- `nodemon`: Watches directory for file changes and automatically restarts server with new code
- ~~`bcrypt`: Encrypting and Decrypting passwords~~
- `jwt-simple`: Creates the web tokens we save to localStorage for authentication later
- `passport`: A system that employs "Strategies" to assist in different types of authentication
- `passport-jwt`: Passport Strategy for saving a Web token to represent a **logged in** user
- `passport-google-auth`: One of many Google Passport Strategies (this one worked in our flow)
- ~~`shrinkwrap`:~~ Locking down the dependencies' versions (now using .npmrc to just save current versions as I install new libraries, then I can leave as is when they work)
- `colors`: Colorize the terminal messages


## References
* [Udemy Course] - React-Redux Full Stack with Oauth2.0 and JWT by Stephen Grider
* [JSONPlaceholder] - Fake Online REST API for Testing and Prototyping
* [JSON Web Tokens] - Industry standard ```RFC 7519``` method for representing claims securely between two parties.
* [npm react-google-login] - Library used to build the GoogleLoginButton component for the client side of the OAuth2 flow through Google
* [Deploying Node.js Apps on Heroku] - Learn why we use the Procfile and maybe how to play with npm scripts and `heroku local dev`

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Udemy Course]: <https://www.udemy.com/react-redux-tutorial/learn/v4/overview>
[Chai Test examples]: <https://www.udemy.com/react-redux-tutorial/learn/v4/overview>
[JSONPlaceholder]: <http://jsonplaceholder.typicode.com/>
[JSON Web Tokens]: <https://jwt.io/>
[Deploying Node.js Apps on Heroku]: <https://devcenter.heroku.com/articles/deploying-nodejs>
[npm react-google-login]: <https://www.npmjs.com/package/react-google-login>
