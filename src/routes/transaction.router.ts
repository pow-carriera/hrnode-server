import express, { NextFunction, Request, Response } from "express";
import * as transactionService from "../controllers/transaction.controller";
import { CreateTransaction, selectUserTransaction } from "../utils/localtypes";
import { Transaction } from "@prisma/client";
import createHttpError from "http-errors";

export const transactionRouter = express.Router();

transactionRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    req.accepts("application/json");

    const query: selectUserTransaction = {
      userId: req.params.id,
      transactionType: req.query.transaction
    };

    try {
      const transactions = await transactionService.getManyUserTransactions(
        query
      );

      res.status(200).json(transactions);
    } catch (error) {
      next(createHttpError(400, `Bad request. ${error}`));
    }
  }
);

transactionRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    req.accepts("application/json");

    try {
      const transactions = await transactionService.getAllUserTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      next(createHttpError(400, `Bad request. ${error}`));
    }
  }
);

transactionRouter.post(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    req.accepts("application/json");

    const data: CreateTransaction = {
      userId: req.params.id,
      ...req.body
    };
    try {
      const transaction = await transactionService.createOneUserTransaction(
        data
      );
      res.status(200).json(transaction);
    } catch (error) {
      next(createHttpError(400, `Bad Request. ${error}`));
    }
  }
);
