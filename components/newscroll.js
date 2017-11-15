import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { Animated, Button, Dimensions, Easing, ScrollView, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
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

var self;

export default class NewScroll extends Component {
  static navigationOptions = {
    title: 'Scroll Articles'
  };

  static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
        headerRight: <Button title="Re-Read" onPress={() => params.handleSave()} />
      };
    };

  _saveDetails() {
    self.refs.autoScroll.scrollTo({x: 0, y: 0});
  }

  constructor(){
   super();
    this.state = {
      pan: new Animated.ValueXY(),
      scroll: [],
      duration: 300000,
    }
    self = this;
  }

  componentWillMount(){
    this.props.navigation.setParams({ handleSave: this._saveDetails });
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
            var newSpeed = this.state.pan.y._animation._toValue * 0.8;
            var newOffset = this.state.pan.y._value * 0.8;
            this.state.pan.y._animation._toValue = newSpeed;
            this.state.pan.y._offset = -1 * newOffset;
          }
          }>
          <Text style={styles.buttonText}> 🐢</Text>
        </TouchableOpacity>

        <Container>
        </Container>

          <TouchableOpacity style={styles.speedButton} onPress={() => {
            var newSpeed = this.state.pan.y._animation._toValue * 1.2;
            var newOffset = this.state.pan.y._value * 1.2;
            this.state.pan.y._animation._toValue = newSpeed;
            this.state.pan.y._offset = -1 * newOffset;
            this.refs.autoScroll.scrollToEnd();
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
  container: {
    flex: 1,
    backgroundColor: '#36485f',
  },
  square: {
    width: width,
    backgroundColor: '#dee4ed'
  },
  header: {
    backgroundColor: '#36485f',
    borderBottomWidth: 0,
  },
  newsArticle : {
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#222',
    padding: 15
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
    backgroundColor: '#36485f',
  },
  buttonText: {
    fontSize: 35,
  },
});