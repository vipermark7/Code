import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Contacts from 'react-native-contacts';

Contacts.getAll((err, contacts) => {
    if (err) throw err;
	     // contacts returned
	    console.log(contacts)
    })
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Hi! Do you ever add new contacts to your phone only to forget about them after not talking to them for a while?
          This app is built to help you stop doing that! It will give you an optional quiz about your recently added contacts, while
          asking you if you've kept in touch with your older contacts as well. 
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
