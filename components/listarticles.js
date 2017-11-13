import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
      <Card style={{margin: 10}}>
        <CardItem>
          <Text>{article.title}</Text>
       </CardItem>
       <CardItem>
        <TouchableOpacity style={styles.button} onPress={() => {
            this.setState({deletion_id: article.id});
            this.deleteArticle()
          }
          }>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
       </CardItem>
      </Card>)

    return (
      <View style={styles.container}>
        <View style={styles.urlform}>
          <TouchableOpacity style={styles.button} onPress={() => navigate('Scroll')}>
            <Text style={styles.buttonText}>Start SkRrrrrollin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.clearArticles}>
            <Text style={styles.buttonText}>Clear All Articles</Text>
          </TouchableOpacity>

          <ScrollView>{thisScroll}</ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  urlform: {
    alignSelf: 'stretch',
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    // doesn not work with pure text need to textAlign
    alignItems: 'center',
    // textAlign: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});