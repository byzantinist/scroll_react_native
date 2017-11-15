import React, { Component } from 'react';
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

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

export default class NewScroll extends Component {
  static navigationOptions = {
    title: 'Scroll Articles'
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
      {
        transform: this.state.pan.getTranslateTransform(),
        marginTop: height/2,
      }
    ];
  }

  onLayoutFigureOutHeight(event) {
    var {y, width, x, height} = event.nativeEvent.layout;
    console.log("FFFFFFFF")
    console.log(width)
    console.log(height)
  }

  render() {
    let scrollData = (
      <Animated.View style={this.getStyle()}>
        {this.state.scroll.map((article) =>
          <View style={styles.newsArticle} key={article.id}>
            <Text style={styles.title}>{article.title}</Text>
             <View>{article.body.map((para, index) =>
               <Text style={styles.paragraph} key={index}>{para}</Text>)}
            </View>
            <View style={{backgroundColor:'#36485f',flex:1,height:50}}/>
          </View>)
        }
      </Animated.View>)
    return (
      <ScrollView style={styles.container}>{scrollData}</ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  newsArticle : {
    marginBottom: 30,
  },
  paragraph: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 21,
    color: '#222'
  },
  square: {
    width: width,
    backgroundColor: '#dee4ed'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#222',
    padding: 15
  },
});