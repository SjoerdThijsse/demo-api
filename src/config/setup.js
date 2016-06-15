import bodyParser from "body-parser";
import compress from "compression";
import mongoose from "mongoose";
import responseTime from "response-time";
import { global } from "./global";

const Setup = () => {

  const connectMongoDB = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${global.dbHosts.join(",")}/users`, {
      db: {
        native_parser: true
      },
      replset: {
        rs_name: "users_repl",
        connectWithNoPrimary: true,
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      },
      server: {
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      }
    });
  };

  const setup = (app, logger) => {
    connectMongoDB();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(compress({threshold: 1400, level: 4, memLevel: 3}));
    app.use(responseTime());
    app.use(logger.expressLogger);
  };

  return { setup };

};

export default Setup;
