import { Request, Response, NextFunction } from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";

export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let reportError = true;
  let status = 500;
  let message = error.message;

  [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      message = error.message;
    }
  });

  if (reportError) {
    console.log(error);
  } else {
    console.log(error);
  }

  return res.status(status).json({ message, data: null });
};

export const HandleUnCaughtException = async (error: Error) => {
  console.log(error);
  process.exit(1);
};
