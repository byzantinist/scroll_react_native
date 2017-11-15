import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class UrlForm extends Component {
  static navigationOptions = {
    title: 'Add Articles'
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

       <View style={styles.imageview}><Image style={styles.image} source={require('../images/rain.jpg')}/></View>
        <View style={styles.overlay}>
        <View style={styles.urlform}>
          <Text style={styles.slowyour}>slow your</Text>
           <Text style={styles.title}>S C R O L L</Text>
          <ScrollView  horizontal={true} style={styles.iconheader}><Image style={styles.newsicons} source={require('../images/cnn.jpg')}/><Image style={styles.newsicons} source={require('../images/NYT.jpg')}/><Image style={styles.newsicons} source={require('../images/WAPO.jpg')}/><Image style={styles.newsicons} source={require('../images/npr.png')}/><Image style={styles.newsicons} source={require('../images/atlantic.png')}/><Image style={styles.newsicons} source={require('../images/chico.png')}/><Image style={styles.newsicons} source={require('../images/Medium.jpeg')}/></ScrollView>

          <TextInput ref="UrlBox" style={styles.textinput} placeholder="copy & paste article URL"  placeholderTextColor="#fff"onChangeText={ (url) => this.setState({url}) } />
          <TouchableOpacity style={styles.button} onPress={this.postArticle}>
            <Text style={styles.buttonText}>Submit Article</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigate('ListArticles')}>
            <Text style={styles.buttonText}>View List</Text>
          </TouchableOpacity>
        </View>
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
            Alert.alert(
              'Success!',
              'This article has been added to your reading list!',
              [{Text: 'OK'}],
              { cancelable: false }
            );
          } else if (statusCode === 422) {
            alert(responseData)
          } else {
            alert('Uh. Something weird happened. Maybe reload the app?')
          }
      })
      .done();
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(222, 228, 237, 0.5)',
    marginTop: 30,
    borderRadius: 10,
  },
  overlay:{
    margin: 0,
    padding: 30,
    backgroundColor: 'rgba(54, 72, 95, 0.7)',
    borderRadius: 10,
  },
  imageview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  buttonText: {
    color: 'black',
    fontWeight: '200',
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
  },
  iconheader: {
    paddingBottom: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  newsicons: {
    margin: 3,
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  textinput: {
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
    fontSize: 17,
    alignSelf: 'stretch',
    height: 45,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  slowyour: {
    // textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
    fontWeight: '400'
    // fontWeight: 'bold'
  },
  title: {
    textAlign: 'center',
    fontSize: 44,
    color: '#FCA658',
    fontWeight: '300',
    paddingBottom: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat',
    lineHeight: 44,
  },
  urlform: {
    alignSelf: 'stretch',
  },
  slowyourFont: {
    fontFamily: 'Montserrat',
    fontWeight: '200',
  },
  // scrollFont: {
  //   fontFamily: 'Montserrat',
  //   fontWeight: '400',
  // }
});
