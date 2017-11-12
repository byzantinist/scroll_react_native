import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';

import ScrollContents from './scrollcontents';

export default class ScrollScreen extends Component {
  static navigationOptions = {
    title: 'Scroll'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollContents/>
     );
  }
}