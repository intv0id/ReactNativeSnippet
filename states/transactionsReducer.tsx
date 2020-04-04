import { Transaction, TransactionsStore } from '../src/Transaction';
import { Guid } from '../src/guid';
import Immutable from "immutable";

const INITIAL_STATE: transactionsState = {
    transactions: Immutable.Map<string, Transaction>()
};

export const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return appendTransaction(state, action.payload);
        case "MODIFY_TRANSACTION":
            return appendTransaction(state , action.payload[1], action.payload[0])
        case "REMOVE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.delete(action.payload),
            };
        case "RESET_TRANSACTIONS":
            return { transactions: Immutable.Map<string, Transaction>()};
        case "BULK_ADD_TRANSACTIONS":
            return appendTransactions(state, action.payload);
        default:
            return state;
    }
};

const appendTransactions = (state: transactionsState, transactions: Array<Transaction>) => {
    let transactionAccumulator = state.transactions;
    transactions.forEach((t) => {
        let guid: string;
        while ((guid = Guid.newGuid()) in state.transactions.keys){}
        transactionAccumulator = transactionAccumulator.set(guid, t);
    })
    return {
        ...state,
        transactions: transactionAccumulator,
    }
}

const appendTransaction = (state: transactionsState, transaction: Transaction, guid: string=""): transactionsState => {
    if (guid == ""){
        while ((guid = Guid.newGuid()) in state.transactions.keys){}
    }
    return {
        ...state,
        transactions: state.transactions.set(guid, transaction),
    };
}

interface transactionsState {
    transactions: TransactionsStore,
}
