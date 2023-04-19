import { ErrorRequestHandler } from "express";
import type { HttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (
  err: HttpError,
  req,
  res,
  next
) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message
  });
};
