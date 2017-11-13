import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

           <TouchableOpacity style={styles.button} onPress={() => navigate('Scroll')}>
            <Text style={styles.buttonText}>Start SkRrrrrollin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  postArticle = () => {
      this.refs.UrlBox.setNativeProps({text: ''});
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
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        alert('Sucessfully added Article');
      })
      .done();
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