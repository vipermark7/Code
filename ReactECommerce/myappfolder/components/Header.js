/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Header extends Component<Props> {
  render() {
    return (
      <View style = {styles.header}>
        <Image
          source = {require('../img/cart.jpg')}
          style = {styles.cart}
        Image/>
        <Text style={styles.logo}>e-commerce</Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    marginTop: 20,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 4,
    borderBottomCOlor: '#ccc'
  },
  cart: {
    width: 40,
    height: 40,
  }
  logo: {
    fontSize: 20,
    marginLeft: 10,
    fontStyle: 'italic',
    color: '#2929'
  }
}
});
