import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import NavigationService from './src/navigation/NavigationService';
import AppNavigator from './src/navigation/AppNavigator';
console.disableYellowBox = true;
const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App