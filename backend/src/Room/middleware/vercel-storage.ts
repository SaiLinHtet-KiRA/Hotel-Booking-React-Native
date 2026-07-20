import { NextFunction, Response, Request } from "express";
import { put } from "@vercel/blob";

const SaveImage = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.photo?.[0]) {
      const path = `room/${new Date().getTime()}`;
      const blob = await put(path, files.icon[0].buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: files.icon[0].mimetype,
      });
      req.body.icon = blob.url;
    }

    next();
  } catch (error) {
    next(error);
  }
};
export default SaveImage;
