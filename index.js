import cluster from "cluster";
import domain from "domain";
import express from "express";
import fs from "fs";
import os from "os";
import {
  global
} from "./config/global";
import Logger from "./config/logger";
import Routes from "./config/routes";
import Setup from "./config/setup";

const Index = () => {

  const startAPI = () => {

    const logger = Logger(console);

    const app = express();

    Setup(app, logger);
    Routes(app);

    if (cluster.isMaster) {
      logger.reset();

      for (let i = 0; i < Math.min(os.cpus().length, global.workers); i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.error(`Worker '${worker.process.pid}' died, spinning up another!`);
        cluster.fork();
      });

      if (global.master) {
        const scope = domain.create();
        scope.run(() => console.log("API started"));
        scope.on("error", err => console.error(err));
      }
    } else {
      app.listen(global.port);
    }
  };

  return {
    startAPI: startAPI
  };

};

Index().startAPI();
