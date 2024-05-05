const { readdirSync, mkdir } = require('fs');
let routeCount = 0
const readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);
const os = require('os');
const path = require('path');
let fetcher = false
const { constants } = require("../constants");

module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.status(statusCode).json({
          title: "Validation Failed ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.NOT_FOUND:
        res.status(statusCode).json({
          title: "Not found ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.FORBIDOEN:
        res.status(statusCode).json({
          title: "Forbidoen ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.SERVER_ERROR:
        res.status(statusCode).json({
          title: "Server Error ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.UNAUTHORIZED:
        res.status(statusCode).json({
          title: "Unauthorized ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.SITE_UNAUTHORIZED:
        res.status(statusCode).json({
          title: "Site Unauthorized ",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.TOO_MANY:
        res.status(statusCode).json({
          title: "Too many request",
          msg: err.message,
          stackTrace: err.stack,
        });
        break;
      default:
        console.log(err);
        res.status(500).json({ err: err.message, msg: "Unhandled error" })
        break;
    }
  };

module.exports.cli = (express)=>{
    if(!fetcher){
        console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
        console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
        console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗\n`, 'bgCyan'))
    }
    fetcher = true
    rl.on('line',async (input) => {
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
                console.log(colorful(`CPU:`, 'fgCyan'), colorful(`${Math.round(process.cpuUsage().user / total * 100)} %`, 'fgRed'))
                break;

            case "env":
                console.log(process.env)
                break;
            
            case "init":
               mkdir(path.join(process.cwd(), `/admins/`),()=>{
                console.log('The *admins* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/config/`),()=>{
                console.log('The *config* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/routes/`),()=>{
                console.log('The *routes* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/controllers/`),()=>{
                console.log('The *controllers* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/middleware/`),()=>{
                console.log('The *middleware* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/plugins/`),()=>{
                console.log('The *plugins* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/uploads/`),()=>{
                console.log('The *uploads* folder has been created')
               });
               mkdir(path.join(process.cwd(), `/models/`),()=>{
                console.log('The *models* folder has been created\n')
               });
                break;

            default:
                console.log("Commend not found!")
                break;
        }
        
    })
}

module.exports.autoFetch = (express,pAddress = "hasPermission", cAddress = "controllers", mAddress = "middleware") => {

    if(!fetcher){
        console.log(colorful(`┳┳┓    ┏┓   •┏ `, 'bgCyan'))
        console.log(colorful(`┃┃┃┏┓  ┗┓┓┏┏┓╋╋`, 'bgCyan'))
        console.log(colorful(`┛ ┗┛   ┗┛┗┻┛┗┛┗\n`, 'bgCyan'))
    }

    fetcher = true
    const middleware = {}
    const controllersAddress = path.join("./",cAddress)
    const middlewareAddress = path.join("./",mAddress)

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
                if (item?.middleware) {
                    item.middleware.forEach(midd => {
                        if(midd == pAddress){
                            usage.push(middleware[midd](item.permission))

                        }else{
                            usage.push(middleware[midd])
                        }
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
const colorful = (text, color)=> {
    return colorCons[color] + text + colorCons.reset
}


this.cli()