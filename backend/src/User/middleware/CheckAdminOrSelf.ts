import { Request, Response, NextFunction } from "express";
import { AuthorizeError } from "../../util/error/errors";

async function CheckAdminOrSelf(
  req: Request<{ id: string }>,
  _res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.userId) {
      throw new AuthorizeError("Not logged in");
    }

    if (req.userRole === "admin" || req.userId === req.params.id) {
      next();
      return;
    }

    throw new AuthorizeError("Access denied");
  } catch (error) {
    next(error);
  }
}

export default CheckAdminOrSelf;
