const { readdirSync } = require('fs');
const path = require('path');
const swift = require('swiftly-tools');

module.exports.fetchRoute = (app, routesAddress = "./routes") => {

    for (const file of readdirSync(routesAddress)) {
        try {
            const routeFile = require(routesAddress + "/" + file)
            app.use(routeFile.route, routeFile.router)
            swift.color.console(routeFile.route + " Added as route", 'fgGreen')
        } catch (error) {
            swift.color.console("Can't add " + file, 'fgRed')
        }
    }


}

module.exports.autoFetch = (app, router, routesAddress = "./routes", controllersAddress = "./routes", middlewareAddress = "./routes") => {

}