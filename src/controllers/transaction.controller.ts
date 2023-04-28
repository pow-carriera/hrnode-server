import { db } from "../utils/database";
import type { Transaction, transactionType } from "@prisma/client";
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

export const getAllUserTransactions = async (
  query: any
): Promise<Transaction[]> => {
  return await db.transaction.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      transactionType: query.type
    },
    include: {
      user: {
        include: {
          profile: query.profile
        }
      }
    }
  });
};

export const createOneUserTransaction = async (data: CreateTransaction) => {
  return await db.transaction.create({
    data
  });
};
