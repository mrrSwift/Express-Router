const { readdirSync } = require('fs');
const swift = require('swiftly-tools');

module.exports.fetchRoute = (app, routesAddress = "./routes") => {

    for (const file of readdirSync(routesAddress)) {
        try {
            const routeFile = require(routesAddress + "/" + file)
            app.use(routeFile.route, routeFile.router)
            console.log(colorful("🟢 ~ " + routeFile.route + " route loaded", 'fgGreen'))
        } catch (error) {
            console.log(colorful("🟠 ~ Can't load " + file, 'fgRed'))
        }
    }


}

module.exports.autoFetch = (express, controllersAddress = "./controllers", middlewareAddress = "./middleware") => {
    console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
    console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
    console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗`, 'bgCyan'))
    const middelware = {}

    try {
        for (const file of readdirSync(middlewareAddress)) {
            try {
                const middelwareFile = require(middlewareAddress + "/" + file)
                middelware[middelwareFile.name] = middelwareFile.run
                console.log(colorful("🟢 ~ " + middelwareFile.name + " middleware loaded \n", 'fgGreen'))
            } catch (error) {
                console.log(colorful("🟠 ~ Can't load \n" + file, 'fgRed'))

            }
        }
    } catch (error) {
        console.log(colorful("🟠 ~ Middleware not found \n", 'fgRed'))

    }


    const baseRouter = express.Router();
    for (const controllerFile of readdirSync(controllersAddress)) {
        const controller = require(controllersAddress + "/" + controllerFile)
        const router = express.Router();
        controller.items.forEach(item => {
            if (item?.off) {
                console.log(colorful(item.method.toUpperCase() + ": ", 'fgRed'), colorful(controller.baseRoute + item.route + " Not loaded" + " \n", 'fgYellow'))
            } else {
                const usage = []
                if (item.middelware) {
                    item.middelware.forEach(midd => {
                        usage.push(middelware[midd])
                    })
                }
                usage.push(item.use)
                router[item.method](item.route, usage)
                console.log(colorful(item.method.toUpperCase() + ": ", 'fgRed'), colorful(controller.baseRoute + item.route, 'fgCyan'), colorful(" Loaded" + " \n", 'fgYellow'))

            }
        })
        baseRouter.use(controller.baseRoute, router)
    }

    return baseRouter
}

const colorful = (data, color) => {
    return swift.color.console(data, color)
}