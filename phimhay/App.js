import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import NavigationService from './src/navigation/NavigationService';
import AppNavigator from './src/navigation/AppNavigator';
import createStore from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
console.disableYellowBox = true;
const AppContainer = createAppContainer(AppNavigator);

export const { store, persistor } = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <View style={styles.container}>
            <AppContainer ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }} />
          </View>
        </PersistGate>
      </Provider>
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