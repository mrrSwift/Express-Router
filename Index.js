const { readdirSync } = require('fs');
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

module.exports.autoFetch = (express, controllersAddress = "./controllers", middlewareAddress = "./middleware") => {

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
    let routes = []
    let routesFunction = []

    for (const file of readdirSync(controllersAddress)) {
        const controllerFile = require(controllersAddress + "/" + file)
        const usage = []
        controllerFile.middelware.forEach(item => {
            usage.push(middelware[item])
        });
        routes.push(controllerFile.baseRoute)
        usage.push(controllerFile.run)
        routesFunction.push({ route: controllerFile.route, baseRoute: controllerFile.baseRoute, method: controllerFile.method, use: usage })
    }

    routes = [...new Set(routes)]

    const baseRouter = express.Router();
    for (const baseRoute of routes) {
        const filterFile = routesFunction.filter(item => item.baseRoute === baseRoute)
        const router = express.Router();
        for (const data of filterFile) {
            router[data.method](data.route, data.use)
        }
        baseRouter.use(baseRoute, router)
    }

return baseRouter
}