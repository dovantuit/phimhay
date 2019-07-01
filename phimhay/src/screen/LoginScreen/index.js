import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, ScrollView, TextInput, RefreshControl, TouchableOpacity } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import TEST_DATA from '../../../TEST_DATA.json';
import callApi from '../../api/helper';
import querystring from 'querystring';

const hostApi = 'https://kw.freecinema.info/m';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMovie: [],
      filteredMovie: [],
      refreshing: false,
      pageNumber: 1,
    };
  }

  _onRefresh = () => {
     this.loadData();

    // this.setState({ refreshing: true });
    // this.loadData().then(() => {
    //   this.setState({ refreshing: false });
    // });
    // alert('hello em')
  }

  async componentDidMount() {
    await this.loadData();
  }

  loadData = () => {
    callApi('/cnm', 'POST', querystring.stringify({
      device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
      page_index: this.state.pageNumber
    }))
      .then(res => {
        var temp_arr = [];
        // var ngu = [];
        if (res.data.length != 0) {
          temp_arr = temp_arr.concat(res.data);
          // ngu = ngu.concat(res.data);

        }
        this.setState({
          dataMovie: temp_arr,
          filterMovies: temp_arr,
        }, () =>
            console.log(this.state.filteredMovie))
      })
      .catch(err => console.log(err))
  }


  _onEndReached = () => {
    const endPoint = '/cnm';
    callApi(
      endPoint,
      'post',
      querystring.stringify({
        device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT - P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
        page_index: (this.state.pageNumber + 1)
      })
    ).then(res => {
      if (res.data.length != 0) {
        arr = arr.concat(res.data);
        this.setState({
          dataMovie: this.state.dataSource.cloneWithRows(arr),
          pageNumber: this.state.pageNumber + 1,
        })
        console.log(arr);
      } else {
        Alert.alert('Thông báo',
          'Hiện tại chúng tôi chỉ có bấy nhiêu đây phim thôi!',
          [
            { text: 'OK', onPress: () => console.log('Ok Pressed') }
          ])
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  filterMovies = (textMovie) => {
    let moviesCopy = this.state.dataMovie;
    let results = moviesCopy.filter(movie => movie.key.indexOf(textMovie) === 0);
    this.setState({ filteredMovie: results }, () => console.log(this.state.filteredMovie));
    // console.log(textMovie);

  };

  _renderItem = ({ item }) => (
    <View style={styles.SingleItem}>
      <TouchableOpacity onPress={() => NavigationService.navigate("DetailMovie", {
        key: item.key,
        imagePosterUrl: item.imagePosterUrl,
        title: item.title,
        releaseDate: item.releaseDate,
      })}>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: `${item.imagePosterUrl}` }} />
        <Text style={{ margin: 5, textAlign: 'center', fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    console.log(this.state.filterMovie);
    return (
      <View style={styles.container}>
        <Text style={{ margin: 5, textAlign: 'center', fontSize: 25, marginTop: 20, fontWeight: 'bold' }} >TOMMY MOVIE</Text>
        <TextInput
          style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginTop: 1, marginBottom: 5, paddingLeft: 30 }}
          placeholder='search movie here'
          onChangeText={(phim) => this.filterMovies(phim)}
        />

        <FlatList
          style={styles.MovieItem}
          numColumns={3}
          data={this.state.dataMovie}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={this.props.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          extraData={this.state}
          keyExtractor={(item, index) => item.key}
          renderItem={this._renderItem}
          onEndReached={this._onEndReached}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    backgroundColor: 'lightgray'
  },
  MovieItem: {
    // borderColor: 'black',
    // borderWidth: 1,
    flex: 1,
    backgroundColor: 'gray',
    width: '98%',
    borderRadius: 5,


  },
  SingleItem: {
    // borderColor: 'red',
    // borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: 230,
    width: '32.2%',
    margin: 2,
    backgroundColor: 'white',
  }
})

export default LoginScreen;
