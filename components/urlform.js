import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

export default class UrlForm extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
    this.baseState = this.state
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.urlform}>
          <Text style={styles.header}>Copy & Paste Article URL</Text>

          <TextInput ref="UrlBox" style={styles.textinput} placeholder="Article URL" onChangeText={ (url) => this.setState({url}) } />
          <TouchableOpacity style={styles.button} onPress={this.postArticle}>
            <Text style={styles.buttonText}>Submit Article</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.clearArticles}>
            <Text style={styles.buttonText}>Clear All Articles</Text>
          </TouchableOpacity>

           <TouchableOpacity style={styles.button} onPress={() => navigate('Scroll')}>
            <Text style={styles.buttonText}>Start SkRrrrrollin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  postArticle = () => {
      var statusCode;
      this.refs.UrlBox.setNativeProps({text: ''});
      this.setState({url: ''})
      fetch('https://desolate-oasis-97513.herokuapp.com/scrollios/1/articles', {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        // this sends values of states which we declared above
        body: JSON.stringify({
          url: this.state.url,
        })
      })
      .then((response) => (
        statusCode = response.status,
        console.log(statusCode),
        response.json())
      )
      .then((responseData) => {
          if (statusCode === 201) {
            alert('This article was added to your reading list.');
          } else if (statusCode === 422) {
            alert(responseData)
          } else {
            alert('Uh. Something weird happened. Maybe reload the app?')
          }
      })
      .done();
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
              [{Text: 'OK'}],
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