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
    const baseRouter = express.Router();
    for(const controllerFile of readdirSync(controllersAddress)){
        const controller = require(controllersAddress + "/" + controllerFile)
        const router = express.Router();
        controller.items.forEach(item=>{
            const usage = []
            if(item.middelware){
                item.middelware.forEach(midd=>{
                    usage.push(middelware[midd])
                })
            }
            usage.push(item.use)
            router[item.method](item.route, usage)
          console.log(swift.color.console(item.method + ": " , 'fgRed'),swift.color.console( controller.baseRoute + item.route + " Loaded" + ": " , 'fgCyan'))

        })
        baseRouter.use(controller.baseRoute, router)
    }

    return baseRouter
}