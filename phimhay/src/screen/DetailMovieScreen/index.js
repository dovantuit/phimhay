import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, ImageBackground } from 'react-native';
import NavigationService from '../../navigation/NavigationService';

class DetailMovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imagePosterUrl: 'none',
      // overview: '',
      // adult: false,
      releaseDate: ''

    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', 'none'),
      imagePosterUrl: navigation.getParam('imagePosterUrl', 'none'),
      // overview: navigation.getParam('overview'),
      // adult: navigation.getParam('adult'),
      releaseDate: navigation.getParam('releaseDate'),

    });
  }

  render() {
    return (

      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={{ uri: `${this.state.imagePosterUrl}` }}
        />
        <Text style={styles.tieude}>{this.state.title}</Text>

        <Text style={{
          // color: 'white',
          fontWeight: 'bold',
          fontSize: 15,
          textAlign: 'center',
          marginTop: '-100%',
          marginHorizontal: 20,
          // borderColor: 'black', borderWidth: 1
        }}>{this.state.title}{"\n"}{this.state.releaseDate}</Text>

        <Button
          title="BACK"
          color="#841584"
          onPress={() => NavigationService.navigate("Login")}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'lightgray',
  },
  tieude: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    flex: 1,
    width: '90%',
    backgroundColor: 'gray'
  },
  backgroundImage: {
    borderRadius: 16,
    opacity: 0.3,
    marginTop: 30,
    width: '98%',
    height: '98%',
  }
})

export default DetailMovieScreen;
