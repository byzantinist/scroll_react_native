// DEPRECATED. Replaced by UrlForm

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';

import UrlForm from './urlform';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

        <Text>Start Yur Skroll</Text>
        <Button
          onPress={() => navigate('Scroll')}
          title="Start SkRrrrrollin"
        />
      </View>
     );
  }
}

