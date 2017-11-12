import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

var api = {
  getArticles(){
    var url = 'https://desolate-oasis-97513.herokuapp.com/scrollios/1'
    return fetch(url).then((response) => response.json());
  }
};

export default class MattTest extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      scroll: []
    }
  }

  componentWillMount(){
    api.getArticles().then((response) => {
      this.setState({
        scroll: response
      })
    })
  }

  render() {
    let thisScroll = this.state.scroll.map((article) =>
      <View>
      <Text style={styles.title}>{article.title}</Text>
      <View>{article.body.map((para) =>
        <View><Text style={styles.paragraph}>{para}</Text></View>)}</View>
      </View>)
    console.log(thisScroll);
    return (<View>{thisScroll}</View>);
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