import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/home';
import TransactionsListScreen from './components/transactionsList';
import TransactionDetailsScreen from './components/transactionDetails';
import { Provider } from 'react-redux';
import { transactionsReducer } from './states/transactionsReducer';
import { createStore } from 'redux';


const transactionsStore = createStore(transactionsReducer);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    TransactionsList: TransactionsListScreen,
    TransactionDetails: TransactionDetailsScreen,
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={transactionsStore}>
        <AppContainer/>
      </Provider>
    );
  }
}