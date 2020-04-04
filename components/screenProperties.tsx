import { NavigationScreenProp } from 'react-navigation';
import { Transaction, TransactionsStore } from '../src/Transaction';

export interface screenProps {
    navigation: NavigationScreenProp<any, any>
};

export interface transactionProps {
    transactions: TransactionsStore,
    modifyTransaction: (arg0: string, arg1: Transaction) => void,
    addTransaction: (arg: Transaction) => void,
    removeTransaction: (arg: string) => void,
    bulkAddTransactions: (arg: Array<Transaction>) => void,
    resetTransactions: () => void,
}