import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, CardItem } from 'native-base';

import ScrollContents from './scrollcontents';

var api = {
  getArticles(){
    var url = 'https://desolate-oasis-97513.herokuapp.com/scrollios/1'
    return fetch(url).then((response) => response.json());
  }
};

export default class ListArticles extends Component {
  static navigationOptions = {
    title: 'List Articles'
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
    let thisScroll = this.state.scroll.map((article) =>
      <Card style={styles.card}>
        <View style={styles.cardView}>
        <CardItem style={styles.articleTitle}>
          <Text>{article.title}</Text>
        </CardItem>
        <CardItem>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {
              this.setState({deletion_id: article.id});
              this.deleteArticle()
              }
            }>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </CardItem>
        </View>
      </Card>)

    return (
      <View style={styles.container}>
        <View>
          <ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Scroll')}>
              <Text style={styles.buttonText}>Start SkRrrrrollin</Text>
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
          fetch('https://desolate-oasis-97513.herokuapp.com/scrollios/1', {
              method: 'DELETE',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
          })
          .then((response) => {
            console.log(response.status);
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
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  deleteArticle = () => {
    Alert.alert(
      'Are you sure you want to delete this article?',
      'Please confirm!',
      [
        {text: 'Delete This Article', onPress: () => {
          var deletion_url = 'https://desolate-oasis-97513.herokuapp.com/scrollios/1/articles/' + this.state.deletion_id;
          fetch(deletion_url, {
              method: 'DELETE',
              headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
              },
          })
          .then((response) => {
            console.log(response.status);
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
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 30,
    paddingRight: 30,
  },
  card: {
    marginTop: 10,
    marginBottom: 10
  },
  cardView: {
    flexDirection: 'row',
    flex: 1,
  },
  articleTitle: {
    width: (width / 2)
  },
  deleteButton: {
    alignSelf: 'stretch',
    // doesn not work with pure text need to textAlign
    alignItems: 'center',
    // textAlign: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'stretch',
    // doesn not work with pure text need to textAlign
    alignItems: 'center',
    // textAlign: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});