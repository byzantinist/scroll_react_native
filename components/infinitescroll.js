import React, { Component } from 'react';
import { Card, CardItem } from 'native-base';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

var {
  width,
  height
} = Dimensions.get('window');

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.recordData = props.record.content;
  }

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.newsArticle}>
          <Text style={styles.title}>{this.recordData.title}</Text>
          <View>{this.recordData.body.map((para, index) =>
            <Text style={styles.paragraph}>{para}</Text>)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
    height: height,
    width: width
  },
  image: {
    flex:1,
    height: 300
  },
  paragraph: {
    margin: 10,
    fontSize: 21,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});