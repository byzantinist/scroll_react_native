import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, View, Text } from 'react-native';


import ScrollScreen from './components/scrollscreen';
import ScrollContents from './components/scrollcontents';
import MattTest from './components/matttest';
import UrlForm from './components/urlform';
import ListArticles from './components/listarticles';

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
  UrlForm: { screen: UrlForm },
  ListArticles: { screen: ListArticles },
  Scroll: { screen: ScrollScreen }
});