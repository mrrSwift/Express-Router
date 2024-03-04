const { readdirSync } = require('fs');
const swift = require('swiftly-tools');
let routeCount = 0
const readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);
const os = require('os');
const path = require('path');

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

module.exports.autoFetch = (express, cAddress = "controllers", mAddress = "middleware") => {
    console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
    console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
    console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗\n`, 'bgCyan'))
    const middleware = {}
    const controllersAddress = path.join("./",cAddress)
    const middlewareAddress = path.join("./",mAddress)

    rl.on('line', (input) => {
        switch (input) {
            case "routes":
                console.log(colorful(routeCount + " Route loaded", 'fgRed'))

                break;

            case "monit":
                const cpus = os.cpus();
                const cpu = cpus[0];

                // Accumulate every CPU times values
                const total = Object.values(cpu.times).reduce(
                    (acc, tv) => acc + tv, 0
                );

                console.log(colorful(`Memory:`, 'fgCyan'), colorful(`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`, 'fgRed'))
                console.log(colorful(`Memory:`, 'fgCyan'), colorful(`${Math.round(process.cpuUsage().user / total * 100)} %`, 'fgRed'))
                break;
            case "env":
                console.log(process.env)
                break;

            default:
                break;
        }
    })

    try {
        for (const file of readdirSync(middlewareAddress)) {
            try {
                const folderPath = path.join(__dirname,"../../",middlewareAddress, file)
                const middlewareFile = require(folderPath)
                middleware[middlewareFile.name] = middlewareFile.run
                console.log(colorful("🟢 ~ " + middlewareFile.name + " middleware loaded ", 'fgGreen'))
            } catch (error) {
                console.log(colorful("🟠 ~ Can't load " + file, 'fgRed'))

            }
        }
    } catch (error) {
        console.log(colorful("🟠 ~ Middleware not found. \n", 'fgRed'))

    }


    const baseRouter = express.Router();
    for (const controllerFile of readdirSync(controllersAddress)) {
        const folderPath = path.join(__dirname,"../../",controllersAddress, controllerFile)
        const controller = require(folderPath)
        const router = express.Router();
        controller.items.forEach(item => {
            if (item?.off) {
                console.log(colorful(item.method.toUpperCase() + ": ", 'fgRed'), colorful(controller.baseRoute + item.route + " Not loaded.", 'fgYellow'))
            } else {
                const usage = []
                if (item.middleware) {
                    item.middleware.forEach(midd => {
                        usage.push(middleware[midd])
                    })
                }
                usage.push(item.use)
                router[item.method](item.route, usage)
                routeCount += 1
                console.log(colorful(item.method.toUpperCase() + ": ", 'fgRed'), colorful(controller.baseRoute + item.route, 'fgCyan'), colorful(" Loaded.", 'fgYellow'))

            }
        })
        baseRouter.use(controller.baseRoute, router)
    }
    console.log(colorful(routeCount + " Route loaded", 'fgRed'))

    return baseRouter
}

const colorful = (data, color) => {
    return swift.color.console(data, color)
}