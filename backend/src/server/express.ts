import express, { Express } from "express";
import Routes from "../router/index.route";

import { HandleErrorWithLogger } from "../util/error/handler";
import cors from "cors";
import { SECRET } from "../config/config";
import session from "express-session";

export default class ExpressServer {
  public app: Express;
  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.app.use(
      cors({
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      }),
    );

    this.app.use(
      session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: false,

          sameSite: "lax",
        },
      }),
    );
    this.app.use(express.json());
    this.app.use(Routes);

    this.app.use(HandleErrorWithLogger);
  }
  startServer() {
    this.app.listen(4000, () =>
      console.log("Express server is started in port ", 4000),
    );
  }
}
