import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet
} from 'react-native';
import {
  Card,
  CardItem,
} from 'native-base';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.recordData = props.record.content;
  }

  render() {
    return (
      <Card style={{margin: 10}}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  paragraph: {
    margin: 10,
  }
});
