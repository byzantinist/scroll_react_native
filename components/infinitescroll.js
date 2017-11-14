import React, { Component } from 'react';
import { Card, CardItem } from 'native-base';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.recordData = props.record.content;
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Text style={styles.title}>{this.recordData.title}</Text>
        </CardItem>
        <CardItem>
          <View>{this.recordData.body.map((para, index) =>
            <View key={index}>
              <Text style={styles.paragraph}>{para}</Text>
            </View>)}
          </View>
        </CardItem>
        <CardItem>
          <Image style={{ width: 300, height: 300 }} source={{uri: "https://i.ytimg.com/vi/b6dT4kyVUuY/maxresdefault.jpg"}} />
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});