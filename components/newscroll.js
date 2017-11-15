import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
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
      scroll: [],
      duration: 300000,
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
      duration: this.state.duration,
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
      <Container>
      <Header style={styles.header}>
        <TouchableOpacity style={styles.speedButton} onPress={() => {
            var newSpeed = this.state.pan.y._animation._toValue * 0.9;
            var newOffset = this.state.pan.y._value * 0.9;
            this.state.pan.y._animation._toValue = newSpeed;
            this.state.pan.y._offset = -1 * newOffset;
          }
        }>
          <Text>Panda is slow!</Text>
        </TouchableOpacity>
        <Container>
        </Container>
        <TouchableOpacity style={styles.speedButton} onPress={() => {
            var newSpeed = this.state.pan.y._animation._toValue * 1.1;
            var newOffset = this.state.pan.y._value * 1.1;
            this.state.pan.y._animation._toValue = newSpeed;
            this.state.pan.y._offset = -1 * newOffset;
          }
        }>
          <Text>Red Panda is fast!</Text>
        </TouchableOpacity>
      </Header>
      <ScrollView style={styles.container}>{scrollData}</ScrollView>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  header: {
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
  speedButton: {
    backgroundColor: '#59cbbd',
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