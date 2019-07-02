import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, ScrollView, TextInput, RefreshControl, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import TEST_DATA from '../../../TEST_DATA.json';
import callApi from '../../api/helper';
import querystring from 'querystring';
import debounce from 'lodash';

//api cinema /cnm
const hostApi = 'https://kw.freecinema.info/m';
const endPoint = '/cnm';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      dataMovie: [],
      filteredMovie: [],
      refreshing: false,
      page_index: 1,
      loadMore: true,
      filterText: '',
      isLoading: true,
      onReacheddLoading: false,
    };
    this._onRefresh = this._onRefresh.bind(this);
    // this._onEndReached = this._onEndReached.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.loadData(this.state.page_index);
    this.setState({ refreshing: true })

    // Alert.alert('Refesh done')
    // Alert.alert('Thông báo',
    //   'Bạn vừa load lại danh sách phim!',
    //   [
    //     { text: 'Tôi biết rồi!', onPress: () => console.log('Ok Pressed') }
    //   ])
  }
  // 
  async componentDidMount() {
    await this.loadData();
  }

  loadData = (next = 1) => {

    callApi(endPoint, 'post', querystring.stringify({
      device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT-P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
      page_index: next
      // page_index: 78
    }))
      .then(res => {
        var temp_arr = [];
        if (res.data.length != 0) {
          temp_arr = temp_arr.concat(res.data);

        }
        this.setState({
          dataMovie: temp_arr,
          page_index: next,
          isLoading: false,
        }, () =>
            console.log('# data ban dau:', this.state.filteredMovie))
      })
      .catch(err => console.log(err))
  }


  _onEndReached() {
    // Alert.alert('Thông báo',
    //   'Bạn vừa load thêm danh sách phim!',
    //   [
    //     { text: 'Tôi biết rồi!', onPress: () => console.log('Ok Pressed') }
    //   ])
    callApi(endPoint, 'post', querystring.stringify({
      device_agent: "{\"client_id\":\"2922648845\",\"device_name\":\"GT - P7500\",\"device_id\":\"09CE2A8DE256421DA3F9C49400AA73DF\",\"os_name\":\"android\",\"os_version\":\"1.0.1\",\"app_name\":\"io.mov.pkg2018\",\"app_version\":\"1.0.0\"}",
      page_index: (this.state.page_index + 1)
    })
    ).then(res => {
      var arr = []
      if (res.data.length != 0) {
        arr = arr.concat(res.data);
        this.setState({
          dataMovie: this.state.dataMovie.concat(arr),
          page_index: this.state.page_index + 1,
          isLoading: false
        })
        console.log('# data sau khi reach: ', this.state.dataMovie);
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
    // Alert.alert('Load more done')

  }

  filterMovies = (textMovie) => {
    let moviesCopy = this.state.dataMovie;
    let results = moviesCopy.filter(movie => movie.key.indexOf(textMovie) === 0);
    this.setState({
      filteredMovie: results,
      filterText: textMovie
    }, () => console.log('# filtered Movie:', this.state.filteredMovie));
    console.log('# filter text:', this.state.filterText);

  };

  // onEndReached = () => {
  //   console.log('onEndReached()', this.state.data)
  //   // let data = this.state.data
  //   // let newData = data.concat(this.getData(NUM_DATA, data.length + 1))
  //   // this.setState({data: newData})
  //   this.loadData(this.state.page_index + 1);
  // }

  _renderItem = ({ item }) => (
    <View style={styles.SingleItem}>
      <TouchableOpacity onPress={() => NavigationService.navigate("DetailMovie", {
        key: item.key,
        imagePosterUrl: item.imagePosterUrl,
        title: item.title,
        releaseDate: item.releaseDate,
        trailer: item.trailer,
      })}>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: `${item.imagePosterUrl}` }} />
        <Text style={{ margin: 5, textAlign: 'center', fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        <Text style={{ margin: 5, textAlign: 'center', fontSize: 25, marginTop: 20, fontWeight: 'bold' }} >TOMMY MOVIE</Text>
        <TextInput
          style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginTop: 1, marginBottom: 5, paddingLeft: 30 }}
          placeholder='search movie here'
          onChangeText={(phim) => this.filterMovies(phim)}
        />
        {this.state.isLoading ? <ActivityIndicator style={{paddingVertical:10, display:'flex'}} size="large" color="#0000ff" />:<View></View>}
        

        {this.state.filterText != '' ?
          <FlatList
            style={styles.MovieItem}
            numColumns={3}
            data={this.state.filteredMovie}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            // extraData={this.state}
            keyExtractor={(item, index) => item.key}
            renderItem={this._renderItem}
          />
          :
          <FlatList
            style={styles.MovieItem}
            numColumns={3}
            data={this.state.dataMovie}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem}
            onEndReached={() => this._onEndReached()}
            onEndReachedThreshold={1}
          />}

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
