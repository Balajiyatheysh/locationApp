import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import { Provider} from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/HomeScreen';
import MapViewScreen from './Screens/MapViewScreen';
import { store } from './Store/Store';

export type ScreenParamTypes = {
  Home: undefined;
  MapViewScreen: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>();
  // console.log('+++++++++')
  return (
    <NavigationContainer>
      <Provider store={store}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Location Manager' }}
            />
            <Stack.Screen
              name="MapViewScreen"
              component={MapViewScreen}
              options={{ title: 'Map View' }}
            />
          </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
 
});
