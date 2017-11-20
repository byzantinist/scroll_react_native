import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import AddArticles from './components/addarticles';
import ListArticles from './components/listarticles';
import ScrollArticles from './components/scrollarticles';
import DeviceInfo from 'react-native-device-info';
const deviceIdentifier = DeviceInfo.getUniqueID();


export default class App extends React.Component {
  render() {
    return (
        <ScrollApp />
    );
  }
}

export const ScrollApp = StackNavigator({
  AddArticles: { screen: AddArticles },
  ListArticles: { screen: ListArticles },
  ScrollArticles: { screen: ScrollArticles },
});
