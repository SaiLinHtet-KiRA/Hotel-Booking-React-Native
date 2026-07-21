import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

declare module "express" {
  interface Request {
    userId?: string;
    userRole?: string;
    userBanned?: boolean;
  }
}
