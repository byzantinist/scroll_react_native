import React, { Component } from 'react';
import Dataset from 'impagination';
import { Card, CardItem, Container, Content, Header, Spinner, Title } from 'native-base';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, View } from 'react-native';

import InfiniteScroll from './infinitescroll';

var {
  width,
  height
} = Dimensions.get('window');

export default class ScrollContents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
      pan: new Animated.ValueXY(),
    };
  }

  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 15,

      // Anytime there's a new state emitted, we want to set that on
      // the components local state.
      observe: (datasetState) => {
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://desolate-oasis-97513.herokuapp.com/scrollios/1`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });

    // Set the readOffset to the first record in the state
    dataset.setReadOffset(0);
    this.setState({dataset});
  }

  componentWillMount() {
    this.setupImpagination();
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
        padding: 20,
        marginTop: height/2,
        color: 'black'
      }
    ];
  }

  onLayoutFigureOutHeight(event) {
    var {scroll} = event.nativeEvent.layout;
    console.log("FFFFFFFF")
    console.log(scroll)
  }

  renderItem() {
    return this.state.datasetState.map(record => {
      if (!record.isSettled) {
        return <Spinner key={Math.random()} style={styles.card}/>;
      }
      return <InfiniteScroll record={record} key={record.index} style={styles.card}/>;
    });
  }

  setCurrentReadOffset = (event) => {
    let itemHeight = 402;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render() {
    return (
      <Container style={styles.container}>
          <Header style={styles.header}>
            <Title style={styles.headerText}>Slow Ur Scroll</Title>
          </Header>
          <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>

          <View style={styles.container} onLayout={ this.onLayoutFigureOutHeight } >
        <Animated.Text style={this.getStyle()}>
              <Card style={styles.card}>
                <CardItem>
                  <Text style={styles.textStyle}>Charlie really likes kittens!</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg"}}
                  />
                </CardItem>
                <CardItem>
                  <Text style={styles.textStyle}>They are much better than silly goldendoodles!</Text>
                </CardItem>
              </Card>

              <Card style={styles.card}>
                <CardItem>
                  <Text style={styles.textStyle}>Ruby is a Red Panda who eats bamboo and Sour Patch Kids</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://i.ytimg.com/vi/b6dT4kyVUuY/maxresdefault.jpg"}}
                  />
                </CardItem>
                <CardItem>
                  <Text style={styles.textStyle}>Item description</Text>
                </CardItem>
              </Card>

              <Card style={styles.card}>
                <CardItem>
                  <Text style={styles.textStyle}>Ruby is also a master assassin who will eliminate all of your enemies for the right price!</Text>
                </CardItem>
                <CardItem>
                  <Image style={styles.image} source={{uri: "https://i.pinimg.com/736x/e4/a0/43/e4a043311adecfe96ef70416687a3ed7--pandas-playing-too-cute.jpg"}} />
                </CardItem>
                <CardItem>
                  <Text style={styles.textStyle}>Item description</Text>
                </CardItem>
              </Card>

              {this.renderItem()}

            </Animated.Text>

       </View>

          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
    height: height,
    width: width,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 0,
    paddingRight: 0,
  },
  header: {
    backgroundColor: '#59cbbd',
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
  },
  image: {
    flex:1,
    height: 300
  },
  paragraph: {
    padding: 5,
    fontSize: 16,
    margin: 10,
  },
  square: {
    width: width,
    height: 5000,
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: 16,
  },
  title: {
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});