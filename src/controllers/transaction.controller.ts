import { db } from "../utils/database";
import type { Transaction } from "@prisma/client";
import type {
  selectUserTransaction,
  CreateTransaction
} from "../utils/localtypes";

export const getManyUserTransactions = async (
  query: selectUserTransaction
): Promise<Transaction[]> => {
  const { userId, transactionType } = query;
  return await db.transaction.findMany({
    where: {
      userId,
      transactionType
    }
  });
};

export const getAllUserTransactions = async (): Promise<Transaction[]> => {
  return await db.transaction.findMany();
};

export const createOneUserTransaction = async (data: CreateTransaction) => {
  return await db.transaction.create({
    data
  });
};
