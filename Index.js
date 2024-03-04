const { readdirSync } = require('fs');
const path = require('path');
const swift = require('swiftly-tools');

module.exports.fetchRoute = (app, routesAddress = "./routes") => {

    for (const file of readdirSync(routesAddress)) {
        try {
            const routeFile = require(routesAddress + "/" + file)
            app.use(routeFile.route, routeFile.router)
            swift.color.console(routeFile.route + " route loaded", 'fgGreen')
        } catch (error) {
            swift.color.console("Can't load " + file, 'fgRed')
        }
    }


}

module.exports.autoFetch = (app, router, controllersAddress = "./controllers", middlewareAddress = "./middleware") => {

    const middelware = {}

    for (const file of readdirSync(middlewareAddress)) {
        try {
            const middelwareFile = require(middlewareAddress + "/" + file)
            middelware[middelwareFile.name] = middelwareFile.run
            swift.color.console(middelwareFile.name + " middleware loaded", 'fgGreen')
        } catch (error) {
            swift.color.console("Can't load " + file, 'fgRed')

        }
    }

    for(const file of readdirSync(controllersAddress)){

        const controllerFile =  require(controllersAddress + "/" + file)
        const usage = []
        controllerFile.middelware.forEach(item => {
            usage.push(middelware[item])
        });
        usage.push(controllerFile.run)
        router.use(controllerFile.method, usage)

    }



}