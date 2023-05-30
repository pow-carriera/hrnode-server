import { db } from "../utils/database";
import type { Transaction, transactionType } from "@prisma/client";
import type {
  selectUserTransaction,
  CreateTransaction
} from "../utils/localtypes";
import moment from "moment";

export const getUserTransactions = async (
  query: selectUserTransaction
): Promise<any[]> => {
  const { userId, transactionType, profile } = query;
  return await db.transaction.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      userId,
      transactionType
    },
    include: {
      user: {
        select: {
          role: true,
          profile
        }
      }
    }
  });
};

export const getAllUserTransactions = async (query: any): Promise<any[]> => {
  return await db.transaction.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: {
      userId: query.userId
    },
    include: {
      user: {
        select: {
          role: true,
          profile: query.profile
        }
      }
    }
  });
};

export const createOneUserTransaction = async (data: CreateTransaction) => {
  const user = await db.user.findFirst({
    where: {
      id: data.userId
    },
    include: {
      profile: true
    }
  });
  await db.calendarEvent.create({
    data: {
      userId: data.userId,
      title: data.transactionType + ", " + user?.profile?.firstName,
      start: moment(data.startDate).format("YYYY-MM-DD"),
      end: moment(data.endDate).format("YYYY-MM-DD"),
      allDay: false
    }
  });
  return await db.transaction.create({
    data
  });
};

export const approveUserTransaction = async (id: string) => {
  return await db.transaction.update({
    where: {
      id
    },
    data: {
      status: "Approved"
    }
  });
};

export const declineUserTransaction = async (id: string) => {
  return await db.transaction.update({
    where: {
      id
    },
    data: {
      status: "Declined"
    }
  });
};
