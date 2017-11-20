import React, { Component } from 'react';
import { Card, CardItem } from 'native-base';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
const deviceIdentifier = DeviceInfo.getUniqueID();

var api = {
  getArticles(){
    var url = `https://nameless-chamber-28643.herokuapp.com/scrollios/${deviceIdentifier}`
    return fetch(url).then((response) => response.json());
  }
};

export default class ListArticles extends Component {
  static navigationOptions = {
    title: 'List Articles',
    headerStyle: {
      backgroundColor: '#36485f'
    },
    headerTintColor: 'white'
  };

  constructor(props){
    super(props);
    this.state = {
      scroll: [],
      deletion_id: 0
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
    const { navigate } = this.props.navigation;
    let thisScroll = this.state.scroll.map((article, index) =>
      <Card style={styles.card} key={index}>
        <View style={styles.cardView}>
        <CardItem style={styles.articleTitle}>
          <Text style={styles.articleTitleText}>{article.title}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {
              this.setState({deletion_id: article.id});
              this.deleteArticle()
              }
            }>
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </CardItem>
        </View>

      </Card>)

    return (
      <View style={styles.container}>
      <View style={styles.imageview}><Image style={styles.image} source={require('../images/rain.jpg')}/></View>
        <View>
          <ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigate('ScrollArticles')}>
              <Text style={styles.buttonText}>Start Scroll</Text>
            </TouchableOpacity>
            {thisScroll}
            <TouchableOpacity style={styles.button} onPress={this.clearArticles}>
            <Text style={styles.buttonText}>Clear All Articles</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
     );
  }

  clearArticles = () => {
    Alert.alert(
      'Are you sure you want to clear all articles?',
      'Please confirm!',
      [
        {text: 'Clear All Articles', onPress: () => {
          fetch(`https://nameless-chamber-28643.herokuapp.com/scrollios/${deviceIdentifier}`, {
              method: 'DELETE',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
          })
          .then((response) => {
            Alert.alert(
              'Success!',
              'All articles have been cleared!',
              [{Text: 'OK', onPress: () => {
                this.setState({scroll: []})
              }}],
              { cancelable: false }
            )
          })
          .done();
        }},
        {text: 'Cancel', style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  deleteArticle = () => {
    Alert.alert(
      'Are you sure you want to remove this article?',
      'Please confirm!',
      [
        {text: 'Remove This Article', onPress: () => {
          var deletion_url = `https://nameless-chamber-28643.herokuapp.com/scrollios/${deviceIdentifier}/articles/` + this.state.deletion_id;
          fetch(deletion_url, {
              method: 'DELETE',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
          })
          .then((response) => {
            Alert.alert(
              'Success!',
              'This article has been deleted!',
              [{Text: 'OK', onPress: () => {
                this.componentWillMount()
              }}],
              { cancelable: false }
            )
          })
          .done();
        }},
        {text: 'Cancel', style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  articleTitle: {
    flex: 1,
    backgroundColor: 'rgb(222, 228, 237)',
  },
  articleTitleText: {
    width: width/1.3,
    fontSize: 18,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(222, 228, 237, 0.8)',
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 28,
  },
  card: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  cardView: {
    paddingLeft: 10,
    paddingRight: 10,
    // flexDirection: 'row',
    flex: 1,
  },
  container: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
  },
  deleteButton: {
    flex: 1,
    width: width/0.8,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    flex: 1,
  },
  imageview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
