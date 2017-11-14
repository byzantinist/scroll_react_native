import React, { Component } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';

var api = {
  getArticles(){
    var url = 'https://desolate-oasis-97513.herokuapp.com/scrollios/1'
    return fetch(url).then((response) => response.json());
  }
};

var {
  width,
  height
} = Dimensions.get('window');

export default class ModalBox extends Component {
  static navigationOptions = {
    title: 'Add Articles'
  };

  constructor(){
   super();
    this.state = {
      pan: new Animated.ValueXY(),
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

  componentDidMount() {
    this.triggerAnimation();
  }

  triggerAnimation(cb) {
    Animated.sequence([
      Animated.timing(this.state.pan, {
      duration: 300000,
      easing: Easing.linear,
      toValue: {x: 0, y: -5000}
      }),
    ]).start(cb);
  }

  getStyle() {
    return [
    styles.square,
    {     transform: this.state.pan.getTranslateTransform(),
          padding: 20,
          marginTop: height/2,
          color: 'black'}
    ];
  }

  onLayoutFigureOutHeight(event) {
        var {scroll} = event.nativeEvent.layout;
        console.log("FFFFFFFF")
        console.log(scroll)
  }

  render() {
    return (
      <View style={styles.container} onLayout={ this.onLayoutFigureOutHeight } >
        <Animated.Text style={this.getStyle()}>
          {this.state.scroll.map((article) =>
          <Text>
            <Text style={styles.title}>{article.title}</Text>
            <Text>{article.body.map((para) =>
              <Text style={styles.paragraph}>{para}</Text>)}
            </Text>
          </Text>)}
        </Animated.Text>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  paragraph: {
    padding: 5,
    fontSize: 12,
    margin: 10,
  },
  square: {
    width: width,
    height: 5000,
    backgroundColor: 'white'
  },
  title: {
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});