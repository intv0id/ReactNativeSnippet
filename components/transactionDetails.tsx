import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Picker } from 'react-native';
import { screenProps, transactionProps } from './screenProperties';
import { Transaction, Currencies, PaymentInstrument, Reason, ReasonEmoji, PIEmoji } from '../src/Transaction';
import { mapStateToProps, mapDispatchToProps } from '../states/transactionsUtils';
import { connect } from 'react-redux';

class TransactionDetailsScreen extends Component<transactionsDetailsProps, transactionsDetailsState>{

  constructor(props) {
    super(props);
    this.state = {
      transaction: this.props.navigation.state.params.transaction.clone(),
      guid: this.props.navigation.state.params.guid
    };
  }

  save() {
    this.props.modifyTransaction(this.state.guid, this.state.transaction);
    return this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.recap}>
          {`${this.state.transaction.currency} ${ReasonEmoji.get(this.state.transaction.type)} ${PIEmoji.get(this.state.transaction.pi)}`}
        </Text>
        <Text>Montant</Text>
        <TextInput
          onChangeText={(v) => (
            this.state.transaction.amount = parseFloat(v),
            this.setState({ transaction: this.state.transaction })
          )}
          defaultValue={this.state.transaction.amount.toString()}
          keyboardType={'numeric'}
        />
        <Text>Devise</Text>
        <Picker
          selectedValue={this.state.transaction.currency}
          onValueChange={(v) => (
            this.state.transaction.currency = v,
            this.setState({ transaction: this.state.transaction })
          )}
        >
          {
            Object.keys(Currencies).map(
              (k) => (<Picker.Item key={k} label={Currencies[k]} value={Currencies[k]} />)
            )
          }
        </Picker>
        <Text>Moyen de paiement</Text>
        <Picker
          selectedValue={this.state.transaction.pi}
          onValueChange={(v) => (
            this.state.transaction.pi = v,
            this.setState({ transaction: this.state.transaction })
          )}
        >
          {
            Object.keys(PaymentInstrument).map(
              (k) => (<Picker.Item key={k} label={PaymentInstrument[k]} value={PaymentInstrument[k]} />)
            )
          }
        </Picker>
        <Text>Catégorie</Text>
        <Picker
          selectedValue={this.state.transaction.type}
          onValueChange={(v) => (
            this.state.transaction.type = v,
            this.setState({ transaction: this.state.transaction })
          )}
        >
          {
            Object.keys(Reason).map(
              (k) => (<Picker.Item key={k} label={Reason[k]} value={Reason[k]} />)
            )
          }
        </Picker>
        <View style={styles.saveButton}>
          <Button onPress={this.save.bind(this)} title="Enregistrer" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    padding: "10%",
    textAlign: "center",
  },
  recap: {
    fontSize: 40,
    textAlign: "center",
    width: "100%",
    padding: "5%",
  }
});

interface transactionsDetailsProps extends screenProps, transactionProps {
  transaction: Transaction,
  guid: string,
};

interface transactionsDetailsState {
  transaction: Transaction,
  guid: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailsScreen);