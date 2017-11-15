import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListArticles from './components/listarticles';
import ScrollScreen from './components/scrollscreen';
import UrlForm from './components/urlform';
import NewScroll from './components/newscroll';

export default class App extends React.Component {
  render() {
    return (
        <ScrollApp/>
    );
  }
}

export const ScrollApp = StackNavigator({
  NewScroll: { screen: NewScroll },
  UrlForm: { screen: UrlForm },
  ListArticles: { screen: ListArticles },
  Scroll: { screen: ScrollScreen },
});