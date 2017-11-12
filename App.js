import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, View, Text } from 'react-native';
import { Container } from 'native-base';

import HomeScreen from './components/homescreen';
import ScrollScreen from './components/scrollscreen';
import ScrollContents from './components/scrollcontents';
import MattTest from './components/matttest';

export default class App extends React.Component {
  render() {
    return (
        <ScrollApp/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const ScrollApp = StackNavigator({
  Home: { screen: HomeScreen },
  Scroll: { screen: ScrollScreen }
});