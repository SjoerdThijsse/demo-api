import expressWinston from "express-winston";
import fs from "fs";
import os from "os";
import sprintf from "sprintf"
import winston from "winston";
import {
  global
} from "./global";

const Logger = _console => {

  const console = _console;

  const packageJSON = JSON.parse(fs.readFileSync("package.json", "utf8"));

  if (!fs.existsSync(global.logDir)) fs.mkdirSync(global.logDir);

  const consoleFormatter = args => {
    let levelColor = "";
    switch (args.level) {
      case "error":
        levelColor = "\x1b[31m";
        break;
      case "warn":
        levelColor = "\x1b[33m";
        break;
      case "info":
        levelColor = "\x1b[36m";
        break;
      case "debug":
        levelColor = "\x1b[34m";
        break;
      default:
        levelColor = "\x1b[36m";
        break;
    }

    return sprintf(`\x1b[0m[%s] ${levelColor}%5s:\x1b[0m %2s/%d on %s: \x1b[36m%s\x1b[0m`,
      new Date().toISOString(), args.level.toUpperCase(), packageJSON.name, process.pid, os.hostname(), args.message);
  };

  const fileFormatter = args => {
    return JSON.stringify({
      name: packageJSON.name,
      hostname: os.hostname(),
      pid: process.pid,
      level: args.level,
      msg: args.message,
      time: new Date().toISOString()
    });
  };

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        name: packageJSON.name,
        formatter: consoleFormatter,
        handleExceptions: true,
      }),
      new winston.transports.File({
        filename: `${global.logDir}/${packageJSON.name}.log`,
        json: false,
        formatter: fileFormatter,
        maxsize: 5242880,
        maxFiles: 5,
        handleExceptions: true,
      })
    ],
    exitOnError: false
  });

  logger.stream = {
    write: (message, encoding) => {
      logger.info(message);
    }
  };

  const expressLogger = new expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true
  });

  console.log = msg => logger.info(msg);
  console.error = msg => logger.error(msg);
  console.warn = msg => logger.warn(msg);
  console.info = msg => logger.info(msg);
  console.debug = msg => logger.debug(msg);

  const reset = () => {
    if (fs.existsSync(`${global.logDir}/${packageJSON.name}.log`))
      fs.unlinkSync(`${global.logDir}/${packageJSON.name}.log`);
  };

  return {
    expressLogger: expressLogger,
    logger: logger,
    reset: reset,
    stream: logger.stream
  }

};

export default Logger;
