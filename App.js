import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import AddArticles from './components/addarticles';
import ListArticles from './components/listarticles';
import ScrollArticles from './components/scrollARTICLES';

export default class App extends React.Component {
  render() {
    return (
        <ScrollApp/>
    );
  }
}

export const ScrollApp = StackNavigator({
  AddArticles: { screen: AddArticles },
  ListArticles: { screen: ListArticles },
  ScrollArticles: { screen: ScrollArticles },
});