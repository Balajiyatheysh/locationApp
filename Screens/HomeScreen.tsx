import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, FlatList, Button, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { ScreenParamTypes } from '../App'
import { useAppDispatch } from '../Hooks/hooks'
import { latlangSender } from '../Features/locationFeature/locationMapViewSlice'
import { EXAMPLE_DATA } from '../assets/data';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';


const HomeScreen = () => {

  const [lati, setLati] = React.useState<number>(0);
  const [longi, setLongi] = React.useState<number>(0);
  const [LocationServiceEnabled, setLocationServiceEnabled] = React.useState(false)
  const [currentDate, setCurrentDate] = React.useState('')
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Home'>>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
    var date = new Date();
    setCurrentDate(date + '')
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    let { coords } = await Location.getCurrentPositionAsync();
    console.log(coords)
    setLati(coords.latitude)
    setLongi(coords.longitude)

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setDisplayCurrentAddress(address);
        console.log('address', address)
      }
    }
  }
  const [TEMP_DATA, setTEMP_DATA] = useState(EXAMPLE_DATA)

  const deleteSelectedElement = (id: number, name: string) => {
    Alert.alert(
      'Are You Sure Want To Delete Item = ' + name.toUpperCase(),
      'Select Below Options',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            // Filter Data 
            const filteredData = TEMP_DATA.filter(item => item.id !== id);
            //Updating List Data State with NEW Data.
            setTEMP_DATA(filteredData);
          }
        },
      ])
  }
  // console.log('location map view console log before itemremder')


  const ItemRender = ({ id, name, address, latitude, longitude }: { id: number, name: string, address: string, latitude: number, longitude: number }) => (
    <View style={{ flex: 1, flexDirection: 'row', margin: 5, padding: 5 , justifyContent:'space-between'}}>
      <TouchableOpacity 
      style={{ padding: 5, marginRight: 15 }} 
      onPress={()=>{
        dispatch(latlangSender({latlang:{latitude: latitude, longitude:longitude}})); 
        navigator.navigate('MapViewScreen')
      }}>
        <Text style={styles.itemText}>{name}</Text>
        <Text>{address}</Text>
        <Text>{currentDate}</Text>
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AntDesign name="delete" size={25} color="red" style={{ width: 25 }} onPress={() => deleteSelectedElement(id, name)} />
      </View>
    </View>
  );

  const Divider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: 'black',
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={{marginRight:250, marginTop:-15}}><Text style={{fontWeight:'300'}}>Current Location</Text></View>
      <View style={{flexDirection: 'row', marginTop:5 }}>
        <AntDesign name="user" size={35} color="green" />
        <Text style={styles.paragraph}> Current location's latitude and logitude are  :<Text style={{fontWeight:'bold'}}>{lati} </Text>and <Text style={{fontWeight:'bold'}}>{longi} </Text></Text>
      </View>
      <Text style={styles.paragraph}><Text style={{ fontWeight: 'bold' }}>Address : </Text>{displayCurrentAddress}</Text>
      <Divider/>
      <Text style={{fontWeight:'300', marginTop:10, marginRight:230}}>Previous Locations</Text>
      <FlatList
        data={TEMP_DATA}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={300000}
        style={{width:'100%'}}
        renderItem={({ item }) =>
          <ItemRender id={item.id} name={item.name} address={displayCurrentAddress} latitude={lati} longitude={longi} />
        }
        ItemSeparatorComponent={Divider}
        keyExtractor={(item: any) => item.id}
      />
      <Button
        title='Clear all'
        onPress={() => setTEMP_DATA([])} />
    </View>
    
  );

}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 26,
    color: 'black',
    textTransform: 'capitalize'
  }
});

export default HomeScreen