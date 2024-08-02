const { readdirSync, mkdir } = require('fs');
const { constants } = require("./constants");
const readline = require("readline");
const os = require('os');
const path = require('path');
let fetcher = false;
let rl = readline.createInterface(process.stdin, process.stdout);
const { reader, writer, saver } = require('./translate')
let routeCount = 0;
let paths = {};
let tags = []



module.exports.swaggerDoc = (name, version, description, url) => {
    const swagger = {
        swagger: "2.0",
        info: {
            title: name,
            description,
            version,
            contact: { name: 'Swift' }
        },
        servers: [{ url }],
        paths,
        tags
    }
    return swagger
}

module.exports.errorHandler = (trace) => {
    return (err, req, res, next) => {
        const statusCode = res.statusCode ? res.statusCode : 500;
        const errMsg = {
            title: "",
            msg: err.message,
        }
        if (trace) {
            errMsg.stackTrace = err.stack
        }
        switch (statusCode) {
            case constants.VALIDATION_ERROR:
                errMsg.title = "Validation Failed "
                res.status(statusCode).json(errMsg);
                break;
            case constants.NOT_FOUND:
                errMsg.title = "Not found "
                res.status(statusCode).json(errMsg);
                break;
            case constants.FORBIDOEN:
                errMsg.title = "Forbidoen "
                res.status(statusCode).json(errMsg);
                break;
            case constants.SERVER_ERROR:
                errMsg.title = "Server Error "
                res.status(statusCode).json(errMsg);
                break;
            case constants.UNAUTHORIZED:
                errMsg.title = "Unauthorized "
                res.status(statusCode).json(errMsg);
                break;
            case constants.SITE_UNAUTHORIZED:
                errMsg.title = "Site Unauthorized "
                res.status(statusCode).json(errMsg);
                break;
            case constants.TOO_MANY:
                errMsg.title = "Too many request "
                res.status(statusCode).json(errMsg);
                break;
            default:
                console.log(err);
                res.status(500).json({ err: err.message, msg: "Unhandled error" })
                break;
        }
    };
}

module.exports.cli = () => {
    if (!fetcher) {
        console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
        console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
        console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗\n`, 'bgCyan'))
    }
    fetcher = true
    rl.on('line', async (input) => {
        const cmd = input.split(' ')
        switch (cmd[0].toLowerCase()) {
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
                console.log(colorful(`CPU:`, 'fgCyan'), colorful(`${Math.round(process.cpuUsage().user / total * 100)} %`, 'fgRed'))
                break;

            case "env":
                console.log(process.env)
                break;

            case "init":
                mkdir(path.join(process.cwd(), `/admins/`), () => {
                    console.log('The *admins* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/config/`), () => {
                    console.log('The *config* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/routes/`), () => {
                    console.log('The *routes* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/controllers/`), () => {
                    console.log('The *controllers* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/middleware/`), () => {
                    console.log('The *middleware* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/plugins/`), () => {
                    console.log('The *plugins* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/uploads/`), () => {
                    console.log('The *uploads* folder has been created')
                });
                mkdir(path.join(process.cwd(), `/models/`), () => {
                    console.log('The *models* folder has been created\n')
                });
                break;
            case "swiftly":

                switch (cmd[1].toLowerCase()) {
                    case "write":
                        if (cmd.length < 5 ) {
                            console.info(`Commend is wrong!
                                Usage:    swiftly write => 'File address' 'String secret' 'File name'
                                Example:  swiftly write ./secret.txt dosad9sadb9as secret
        
                                Usage:    swiftly read  => 'File address' 'String secret'
                                Example:  swiftly read ./mmd.swiftly dosad9sadb9as 
        
                                Usage:    swiftly save  => 'File address' 'String secret' 'File address'
                                Example:  save ./secret.swiftly dosad9sadb9as ./secret.txt
                                    `)
                        } else {
                            writer(cmd[2], cmd[3], cmd[4])
                        }

                        break;
                    case "read":
                        if (cmd.length < 4 ) {
                            console.info(`Commend is wrong!
                                Usage:    swiftly write => 'File address' 'String secret' 'File name'
                                Example:  swiftly write ./secret.txt dosad9sadb9as secret
        
                                Usage:    swiftly read  => 'File address' 'String secret'
                                Example:  swiftly read ./mmd.swiftly dosad9sadb9as 
        
                                Usage:    swiftly save  => 'File address' 'String secret' 'File address'
                                Example:  save ./secret.swiftly dosad9sadb9as ./secret.txt
                                    `)
                        } else {
                        console.log(reader(cmd[2], cmd[3]))
                        }
                        break;
                    case "save":
                        if (cmd.length < 5 ) {
                            console.info(`Commend is wrong!
                                Usage:    swiftly write => 'File address' 'String secret' 'File name'
                                Example:  swiftly write ./secret.txt dosad9sadb9as secret
        
                                Usage:    swiftly read  => 'File address' 'String secret'
                                Example:  swiftly read ./mmd.swiftly dosad9sadb9as 
        
                                Usage:    swiftly save  => 'File address' 'String secret' 'File address'
                                Example:  save ./secret.swiftly dosad9sadb9as ./secret.txt
                                    `)
                        } else {
                        saver(cmd[2], cmd[3], cmd[4])
                        }
                        break;
                    case "?":
                        console.info(`
                        Usage:    swiftly write => 'File address' 'String secret' 'File name'
                        Example:  swiftly write ./secret.txt dosad9sadb9as secret

                        Usage:    swiftly read  => 'File address' 'String secret'
                        Example:  swiftly read ./mmd.swiftly dosad9sadb9as 

                        Usage:    swiftly save  => 'File address' 'String secret' 'File address'
                        Example:  save ./secret.swiftly dosad9sadb9as ./secret.txt
                            `)
                        break;
                    default:
                        console.log("Commend not found! write 'swiftly ?' for help.")
                        break;
                }

                break;

            default:
                console.log("Commend not found!")
                break;
        }

    })
}

module.exports.autoFetch = (express, pAddress = "hasPermission", cAddress = "controllers", mAddress = "middleware") => {

    if (!fetcher) {
        console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
        console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
        console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗\n`, 'bgCyan'))
    }

    fetcher = true
    const middleware = {}
    const controllersAddress = path.join("./", cAddress)
    const middlewareAddress = path.join("./", mAddress)
    express().use((req, res, next) => {
        res.setHeader('X-Powered-By', "77 114 32 83 119 105 102 116")
        res.setHeader('X-Develop-By', "77 114 32 83 119 105 102 116")
        next()
    })

    try {
        for (const file of readdirSync(middlewareAddress)) {
            try {
                const folderPath = path.join(__dirname, "../../", middlewareAddress, file)
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
        const folderPath = path.join(__dirname, "../../", controllersAddress, controllerFile)
        const controller = require(folderPath)
        const router = express.Router();
        tags.push({
            name: controller?.name ? controller?.name : controller.baseRoute,
            description: controller?.desc ? controller?.desc : "",
        })
        controller.items.forEach(item => {
            if (item?.off) {
                console.log(colorful(item.method.toUpperCase() + ": ", 'fgRed'), colorful(controller.baseRoute + item.route + " Not loaded.", 'fgYellow'))
            } else {
                const usage = []
                if (item?.middleware) {
                    item.middleware.forEach(midd => {
                        if (midd == pAddress) {
                            usage.push(middleware[midd](item.permission))

                        } else {
                            usage.push(middleware[midd])
                        }
                    })
                }
                usage.push(item.use)
                router[item.method](item.route, usage)
                routeCount += 1
                console.log((colorful(item.method.toUpperCase() + ": ", 'fgRed') + colorful(controller.baseRoute + item.route, 'fgCyan') + colorful(" Loaded.", 'fgYellow')).replace("//", "/"))

                paths[(item.method.toUpperCase() + "::" + controller.baseRoute + item.route).replace("//", "/")] = {
                    [item.method.toLowerCase()]: {
                        "summary": item.method.toUpperCase() + " " + (controller.baseRoute + item.route).replace("//", "/"),
                        "description": item?.desc ? item.desc : "",
                        "responses": item?.responses ? item.responses : {},
                        "parameters": item?.parameters ? item.parameters : [],
                        tags: [controller?.name ? controller?.name : controller.baseRoute]
                    },
                }
            }
        })
        baseRouter.use(controller.baseRoute, router)
    }
    console.log(colorful(routeCount + " Route loaded", 'fgRed'))

    return baseRouter
}

const colorCons = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m"
}

const colorful = (text, color) => {
    return colorCons[color] + text + colorCons.reset
}


this.cli()