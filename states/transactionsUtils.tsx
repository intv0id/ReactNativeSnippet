import { bindActionCreators } from "redux";
import { addTransaction, modifyTransaction, bulkAddTransactions, resetTransactions, removeTransaction } from "./transactionsActions";

export const mapStateToProps = state => {
  return { transactions: state.transactions };
};

export const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    bulkAddTransactions,
    modifyTransaction,
    addTransaction,
    resetTransactions,
    removeTransaction,
  }, dispatch)
);
