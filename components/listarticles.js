import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

import ScrollContents from './scrollcontents';

export default class ListArticles extends Component {
  static navigationOptions = {
    title: 'ListArticles'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Text>Pooper Looper!</Text>
     );
  }
}