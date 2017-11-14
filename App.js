import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListArticles from './components/listarticles';
import ModalBox from './components/modalbox';
import ScrollScreen from './components/scrollscreen';
import UrlForm from './components/urlform';

export default class App extends React.Component {
  render() {
    return (
        <ScrollApp/>
    );
  }
}

export const ScrollApp = StackNavigator({
  ModalBox: { screen: ModalBox },
  UrlForm: { screen: UrlForm },
  ListArticles: { screen: ListArticles },
  Scroll: { screen: ScrollScreen },

});