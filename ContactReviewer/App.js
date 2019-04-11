import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contacts from 'react-native-contacts';
import styled from 'styled-components/native';
import { TabNavigator } from 'react-navigation';

//Contacts.getAll((err, contacts) => {
    //if (err) throw err;
	     //// contacts returned
	    //console.log(contacts)
    //})

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <TextStyled> 
          <Text>
			      Hi! Do you add new contacts to your phone only to forget about them a while later?
          </Text>
          <Text>
            This app is built to help you stop doing that! It will give you an optional quiz about your recently added contacts, while
            asking you if you've kept in touch with your older contacts as well. 
          </Text>
        </TextStyled>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container = styled.View`
justifyContent: center;
alignItems: center;
margin: 300px;
`;
const TextStyled = styled.Text`
fontSize: 20;
textAlign: center;
margin: 10px;
`


// tab navigator example from Tracy Lee on Medium
import ContactsList from './A';
import ContactsQuiz from './Angular';
const mainNavigator = TabNavigator({
  Home: {
    screen: javaScriptJeopardyRn,
    path: ''
  },
  Angular: {
    screen: Angular,
    path: 'angular'
  },
  React: {
    screen: ReactJS,
    path: 'react'
  },
  Ember: {
    screen: Ember,
    path: 'ember'
  },
  Vue: {
    screen: Vue,
    path: 'vue'
  }
});
AppRegistry.registerComponent('javaScriptJeopardyRn', () => mainNavigator);
