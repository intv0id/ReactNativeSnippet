import { Transaction } from "../src/Transaction";

export const addTransaction = (transaction: Transaction) => (
    {
        type: 'ADD_TRANSACTION',
        payload: transaction,
    }
);

export const modifyTransaction = (guid: string, transaction: Transaction) => (
    {
        type: 'MODIFY_TRANSACTION',
        payload: [guid, transaction],
    }
)

export const removeTransaction = (transactionId: number) => (
    {
        type: 'REMOVE_TRANSACTION',
        payload: transactionId,
    }
);

export const resetTransactions = () => (
    {
        type: 'RESET_TRANSACTIONS',
    }
);

export const bulkAddTransactions = (transactions: Array<Transaction>) => (
    {
        type: 'BULK_ADD_TRANSACTIONS',
        payload: transactions,
    }
);