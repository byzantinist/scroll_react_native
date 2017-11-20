import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { Animated, Button, Dimensions, Easing, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Display from 'react-native-display';
import { StackNavigator } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
const deviceIdentifier = DeviceInfo.getUniqueID();

Keyboard.dismiss();

var api = {
  getArticles(){
    var url = `https://desolate-oasis-97513.herokuapp.com/scrollios/${deviceIdentifier}`
    return fetch(url).then((response) => response.json());
  }
};

var {
  width,
  height
} = Dimensions.get('window');

var self;
var referenceIndex = 1;

export default class ScrollArticles extends Component {
  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        title: 'Scroll Articles',
        headerStyle: {
          backgroundColor: 'rgba(222, 228, 237, 0.8)'
        },
        headerRight: <Button title="Next Article" onPress={() => params.handleNext()} />
      };
    };

  _nextArticle() {
    if (self.state.scroll.length > 0) {
      if (referenceIndex >= self.state.scroll.length) {
        referenceIndex = 0;
      }
      var referenceName = "ref" + referenceIndex;
      self.refs[referenceName].focus();
      Keyboard.dismiss();
      referenceIndex += 1;
    }
  }

  constructor(){
   super();
    this.state = {
      pan: new Animated.ValueXY(),
      scroll: [],
      duration: 300000,
      pause: false,
      oldSpeed: 0,
      pauseEnable: true,
      playEnable: false
    }
    self = this;
  }

  componentWillMount(){
    this.props.navigation.setParams({ handleNext: this._nextArticle });

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
        marginTop: height/2.8,
      }
    ];
  }

  onLayoutFigureOutHeight(event) {
    var {y, width, x, height} = event.nativeEvent.layout;
  }

  render() {
    let scrollData = (
      <Animated.View style={this.getStyle()}>
        {this.state.scroll.map((article, reference) =>
          <View style={styles.newsArticle} key={article.id}>
            <TextInput ref={"ref" + reference}/>
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
            if (!this.state.pause) {
              var newSpeed = this.state.pan.y._animation._toValue * 0.8;
              var newOffset = this.state.pan.y._value * 0.8;
              this.state.pan.y._animation._toValue = newSpeed;
              this.state.pan.y._offset = -1 * newOffset;
            }
          }
          }>
          <Text style={styles.buttonText}> 🐢</Text>
        </TouchableOpacity>

        <Container style={styles.speedBar}>

          <TouchableOpacity style={styles.speedButton} onPress={() => {
              if (this.state.pause) {
                  this.setState({
                    pause: false,
                    pauseEnable: true,
                    playEnable: false
                  });
                  this.triggerAnimation();
                  this.state.pan.y._animation._toValue = this.state.oldSpeed;
                }
                else {
                  this.setState({
                    pause: true,
                    oldSpeed: this.state.pan.y._animation._toValue,
                    pauseEnable: false,
                    playEnable: true
                  });
                  this.state.pan.stopAnimation(this.callback);
                }
              }
          }>
          <Display enable={this.state.pauseEnable}>
            <Text style={styles.buttonText}> ⏸️</Text>
          </Display>
          <Display enable={this.state.playEnable}>
            <Text style={styles.buttonText}> ▶️</Text>
          </Display>

        </TouchableOpacity>

        </Container>

          <TouchableOpacity style={styles.speedButton} onPress={() => {
              if (!this.state.pause) {
                var newSpeed = this.state.pan.y._animation._toValue * 1.2;
                var newOffset = this.state.pan.y._value * 1.2;
                this.state.pan.y._animation._toValue = newSpeed;
                this.state.pan.y._offset = -1 * newOffset;
              }
            }
          }>
            <Text style={styles.buttonText}>🐇 </Text>
          </TouchableOpacity>
        </Header>

        <ScrollView style={styles.container} ref="autoScroll">{scrollData}</ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 35,
  },
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  header: {
    backgroundColor: '#36485f',
    borderBottomWidth: 0,
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
  speedBar: {
    alignItems: 'center',
  },
  speedButton: {
    backgroundColor: '#36485f',
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