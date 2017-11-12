import React, { Component } from 'react';
import {
  Text,
  Image,
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
          <Text>{this.recordData.title}</Text>
        </CardItem>
        <CardItem>
          <Image style={{ width: 300, height: 300 }} source={{uri: this.recordData.image}} />
        </CardItem>
        <CardItem>
          <Text>{this.recordData.description}</Text>
        </CardItem>
      </Card>
    );
  }
}
