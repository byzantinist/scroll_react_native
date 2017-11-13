import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

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