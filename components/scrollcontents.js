import React, { Component } from 'react';
import {
  Text,
  Image
} from 'react-native';
import {
  Header,
  Container,
  Title,
  Content,
  Card,
  CardItem,
  Spinner
} from 'native-base';

import InfiniteScroll from './infinitescroll';
import MattTest from './matttest';

import Dataset from 'impagination';

export default class ScrollContents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
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
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
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

  renderItem() {
    return this.state.datasetState.map(record => {
      if (!record.isSettled) {
        return <Spinner key={Math.random()}/>;
      }

      return <InfiniteScroll record={record} key={record.content.id} />;
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
      <Container>
          <Header>
            <Title>Ruby's Pooper-Looper!</Title>
          </Header>
          <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>

            <MattTest/>

            <Card style={{margin: 10}}>
              <CardItem>
                <Text>Charlie really likes kittens!</Text>
              </CardItem>
              <CardItem>
                <Image style={{ flex:1, height: 300 }} source={{uri: "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg"}}
                />
              </CardItem>
              <CardItem>
                <Text>They are much better than silly goldendoodles!</Text>
              </CardItem>
            </Card>

            <Card style={{margin: 10}}>
              <CardItem>
                <Text>Ruby is a Red Panda who eats bamboo and Sour Patch Kids</Text>
              </CardItem>
              <CardItem>
                <Image style={{ flex:1, height: 300 }} source={{uri: "https://i.ytimg.com/vi/b6dT4kyVUuY/maxresdefault.jpg"}}
                />
              </CardItem>
              <CardItem>
                <Text>Item description</Text>
              </CardItem>
            </Card>

            <Card style={{margin: 10}}>
              <CardItem>
                <Text>Ruby is also a master assassin who will eliminate all of your enemies for the right price!</Text>
              </CardItem>
              <CardItem>
                <Image style={{ flex:1, height: 300 }} source={{uri: "https://i.pinimg.com/736x/e4/a0/43/e4a043311adecfe96ef70416687a3ed7--pandas-playing-too-cute.jpg"}} />
              </CardItem>
              <CardItem>
                <Text>Item description</Text>
              </CardItem>
            </Card>

            {this.renderItem()}

          </Content>
      </Container>
    );
  }
}



// import React, { Component } from 'react';
// import { StackNavigator } from 'react-navigation';
// import { Button }  from 'react-native-elements'
// import {StyleSheet, Text, View, AppRegistry, Form } from 'react-native';


// class HomeScreen extends Component {
//   static navigationOptions = {
//     title: 'Home',
//     headerStyle:{
//       backgroundColor: 'rgb(171, 172, 173)'
//     }
//   };
//   render() {

//     const { navigate } = this.props.navigation;
//     return (
//       <View style={styles.container}>

//         <Text>Start Yur Skroll</Text>
//         <Button
//           onPress={() => navigate('Scroll')}
//           title="Start SkRrrrrollin"
//         />
//       </View>
//     );
//   }
// }

// class ScrollScreen extends Component {
//   static navigationOptions = {
//     title: 'Scroll',
//     headerStyle:{
//       backgroundColor: 'rgb(171, 172, 173)'
//     }
//   };
//   render() {
//     const { navigate } = this.props.navigation
//     return (
//       <View style={styles.container}>
//         <Text>We DID IT!</Text>
//         <Button
//           onPress={() => navigate('Home')}
//           title="Home"
//         />

//       </View>
//     );
//   }
// }


// export default class App extends React.Component {
//   render() {
//     return <ScrollApp/>;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "pink",
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

// export const ScrollApp = StackNavigator({
//   Home: { screen: HomeScreen },
//   Scroll: { screen: ScrollScreen },
// });

