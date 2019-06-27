import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, ImageBackground } from 'react-native';
import NavigationService from '../../navigation/NavigationService';

class DetailMovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster_path: 'none',
      overview: '',
      adult: false,
      release_date: ''

    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', 'none'),
      poster_path: navigation.getParam('poster_path', 'none'),
      overview: navigation.getParam('overview'),
      adult: navigation.getParam('adult'),
      release_date: navigation.getParam('release_date'),

    });
  }

  render() {
    return (

      <View style={styles.container}>
        {/* {this.state.adult ? <Text style={{ color: 'red', fontWeight: 'bold' }}>18+</Text> : <Text></Text>} */}
        <Image
          style={styles.backgroundImage}
          source={{ uri: `https://image.tmdb.org/t/p/w342${this.state.poster_path}` }}
        />
        <Text style={styles.tieude}>{this.state.title}</Text>

        <Text style={{
          // color: 'white',
          fontWeight: 'bold',
          fontSize:15,
          textAlign: 'center',
          marginTop: '-100%',
          marginHorizontal: 20,
          // borderColor: 'black', borderWidth: 1
        }}>{this.state.title}{"\n"}{this.state.overview}{"\n"}{this.state.release_date}</Text>

        {/* <Text>{this.state.release_date}</Text> */}
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
