import express, { Express, Request, Response, NextFunction } from "express";
import Routes from "../router/index.route";

import { HandleErrorWithLogger } from "../util/error/handler";
import cors from "cors";
import { verifyToken } from "../util/jwt";

export default class ExpressServer {
  public app: Express;
  constructor() {
    this.app = express();
    this.app.set("trust proxy", 1);
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
      }),
    );

    this.app.use(express.json());

    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
          const token = authHeader.split(" ")[1];
          const payload = verifyToken(token);
          req.userId = payload.userId;
          req.userRole = payload.role;
          req.userBanned = payload.banned;
        } catch {
          // token invalid, continue without auth
        }
      }
      next();
    });

    this.app.use(Routes);

    this.app.use(HandleErrorWithLogger);
  }
  startServer() {
    this.app.listen(4000, () =>
      console.log("Express server is started in port ", 4000),
    );
  }
}
