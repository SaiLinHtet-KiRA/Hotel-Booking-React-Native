import { Request, Response, NextFunction } from "express";
import { AuthorizeError } from "../../util/error/errors";

async function CheckAdmin(
  req: Request,
  _res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AuthorizeError("Not logged in");
    }

    if (req.userRole !== "admin") {
      throw new AuthorizeError("Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default CheckAdmin;
