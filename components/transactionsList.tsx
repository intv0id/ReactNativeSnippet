import React, { Component } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import { screenProps, transactionProps } from './screenProperties';
import { Transaction, PIEmoji, ReasonEmoji } from '../src/Transaction';
import { mapStateToProps, mapDispatchToProps } from '../states/transactionsUtils';
import { connect } from 'react-redux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class TransactionsListScreen extends Component<transactionsListProps, transactionsListState>{

  _menu;
  _currentId;
  
  constructor(props) {
    super(props);
  }

  openMenu(k: string) {
    this.setState({"workingTransactionGuid": k});
    this._menu.show();
  }

  closeMenu() {
    this.setState({"workingTransactionGuid": undefined});
    this._menu.hide();
  }

  openTransaction(transactionId: string) {
    return this.props.navigation.navigate('TransactionDetails', { guid: transactionId, transaction: this.props.transactions.get(transactionId) });
  }

  newTransaction() {
    return this.props.navigation.navigate('TransactionDetails', { transaction: new Transaction(), guid: "" });
  }

  deleteTransaction() {
    this.props.removeTransaction(this.state.workingTransactionGuid);
    this.closeMenu();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          Array.from(this.props.transactions,
            ([k, v]) =>
              <ListItem
                key={k}
                title={v.amount.toString() + v.currency}
                subtitle={v.type || "Unknown"}
                leftElement={<Text style={styles.emojiText}>{ReasonEmoji.get(v.type)}</Text>}
                rightElement={
                  <Text style={styles.emojiText}>
                    {PIEmoji.get(v.pi)}
                  </Text>
                }
                onPress={(() => this.openTransaction(k)).bind(this, k)}
                onLongPress={(() => this.openMenu(k)).bind(this, k)}
              >

              </ListItem>
          )
        }

        <Menu 
          style={styles.contextMenu}
          button={<View></View>} 
          ref={(c) => this._menu = c}>
          <MenuItem onPress={this.deleteTransaction.bind(this)}>Delete</MenuItem>
        </Menu>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.newTransaction.bind(this)}
          style={styles.addButtonOpacity}
        >
          <Image source={require("../assets/addButton.png")} style={styles.addButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

interface transactionsListProps extends screenProps, transactionProps { };
interface transactionsListState {
  workingTransactionGuid: string,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  addButtonOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  addButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  emojiText: {
    fontSize: 26,
  },
  contextMenu: {
    width: '90%',
    height: 50,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsListScreen);