# Express-Router

a npm module fo Express app inspired by Nuxt.js

## Ability
 - Cli
 - Error handler
 - Auto fetch

 ## Install
 ```shell
 npm install express-route-detector
```
### Usage 

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

### Cli commends
 - routes
 - monit
 - init
 - env