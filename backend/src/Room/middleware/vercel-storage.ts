import { NextFunction, Response, Request } from "express";
import { put } from "@vercel/blob";

const SaveImage = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files) return next();

    if (files?.length) {
      const photos = await Promise.all(
        files?.map(async (file) => {
          const path = `room/${new Date().getTime()}`;
          const blob = await put(path, file.buffer, {
            access: "public",
            addRandomSuffix: true,
            contentType: file.mimetype,
          });
          return blob.url;
        }),
      );

      req.body.photo = photos;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default SaveImage;
