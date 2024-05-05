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
// By defualt pAddress = "hasPermission", cAddress = "controllerw", mAddress = "middleware" 

app.use(autoFetch(
  express,
  pAddress = "hasPermission", //Permission middleware name
  cAddress = "admins", //Controller folder
  mAddress = "middleware" //Middlewawre folder
  ))

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
