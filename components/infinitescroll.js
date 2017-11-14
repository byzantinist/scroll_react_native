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
      <Card style={styles.card}>
        <View>
        <CardItem>
          <Text style={styles.title}>{this.recordData.title}</Text>
        </CardItem>
        <CardItem>
    <Text> {console.log(this.recordData.height)}</Text>
          <Text style={styles.title}>{this.recordData.height}</Text>
        </CardItem>
        <CardItem>
          <View>{this.recordData.body.map((para, index) =>
            <View key={index}>
              <Text style={styles.paragraph}>{para}</Text>
            </View>)}
          </View>
        </CardItem>
        <CardItem>
          <Image style={styles.image} source={{uri: "https://i.ytimg.com/vi/b6dT4kyVUuY/maxresdefault.jpg"}} />
        </CardItem>
        </View>
      </Card>
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