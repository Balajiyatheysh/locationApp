import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useAppSelector } from '../Hooks/hooks'
import { ScreenParamTypes } from '../App'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


const MapViewScreen = () => {
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'MapViewScreen'>>()
  const { latlang } = useAppSelector((state) => state.LocationMapView)

  return (
    <>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 12.9599905,
          longitude: 77.5181838,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={
            {
              latitude: 12.9599905,
              longitude: 77.5181838
            }
          }
        >
          <Callout>
            <Text>I'm Here {latlang.latitude}{latlang.longitude}</Text>
          </Callout>
        </Marker>
      </MapView>
      <Button
        title='GO BACK'
        onPress={() => navigator.navigate('Home')}
      />
    </>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    width: '100%',
    height: '100%'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
export default MapViewScreen























// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';


// const MapViewScreen = () => {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text>MapViewScreen</Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// export default MapViewScreen

// const styles = StyleSheet.create({})