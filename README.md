# Express-Router

a npm module for Express app inspired by Nuxt.js

## Ability
 - Cli
 - Error handler
 - Auto fetch

 ## Install
 ```shell
 npm install express-route-detector
```
### Usage 

server.js
```js
const { autoFetch, errorHandler } = require('express-route-detector')
const express = require("express");

const app = express();

app.use(autoFetch(express))
app.use(autoFetch(express, pAddress = "hasPermission", cAddress = "admins", mAddress = "middleware"))

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});

```

controller.js
```js
const home = (async (req, res) => {
    res.status(200).json({msg:'Hello world'});
})
module.exports = {
    baseRoute: "/",
    items: [
        {
            off: false,
            route: "/",
            method: "get",
            middleware: [], //option
            permission: "CONTENTUS", //option
            use: home
        },
    ]
}

### Cli commends
 - routes
 - monit
 - init
 - env
