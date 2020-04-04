import React, { Component } from 'react';
import { screenProps, transactionProps } from "./screenProperties";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Transaction, Currencies, PaymentInstrument, Reason } from '../src/Transaction';
import { mapStateToProps, mapDispatchToProps } from '../states/transactionsUtils';
import { Guid } from '../src/guid';

class HomeScreen extends Component<homeProps> {

  constructor(props){
    super(props);
  }

  defineTransactions(){
    this.props.bulkAddTransactions(
      [
        new Transaction(10, Currencies.EURO, PaymentInstrument.CASH, Reason.FOOD),
        new Transaction(100, Currencies.CH_FRANC, PaymentInstrument.CREDITCARD, Reason.HOBBIES)
      ]
    );
  }

  openFile() {
    this.props.resetTransactions();
    this.defineTransactions();
    return this.props.navigation.navigate('TransactionsList');
  }

  newFile() {
    this.props.resetTransactions();
    return this.props.navigation.navigate('TransactionsList');
  }

  render() {

    return (

      <View style={styles.container}>
        <Text style={styles.titleText}>Aide comptable</Text>
        <View style={styles.fileButton}>
          <Button title="Ouvrir un fichier" onPress={this.openFile.bind(this)}></Button>
        </View>
        <View style={styles.fileButton}>
          <Button title="Nouveau Fichier" onPress={this.newFile.bind(this)}></Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileButton: {
    padding: "3%",
    width: "100%",
    textAlign: "center"
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    position: "absolute",
    top: "5%",
  }
});



interface homeProps extends screenProps, transactionProps {};



export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);