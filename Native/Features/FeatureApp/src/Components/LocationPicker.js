import { View, Text, Button, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useNavigation,useRoute,useIsFocused  } from '@react-navigation/native';
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'

export default function LocationPicker({getLocationInfo,handleReadableLocation}) {

    const navigation = useNavigation();
    const [location, setLocation]=useState()
    const [locationPermissionStatus,requestPermission]=useForegroundPermissions();
    const route=useRoute();
    const isfocused=useIsFocused();
    

async function getMap(lat,lon){

    const map=`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lon},${lat}&zoom=14&marker=lonlat:${lon},${lat};color:%23ff0000;size:medium&apiKey=dc913449a4d04dbfb5882381a98f7a7b`

    return map;
}

async function handlePermission(){
    if(locationPermissionStatus.status===PermissionStatus.UNDETERMINED){
        const permission= await requestPermission();
        
        return permission.granted
    }
    if(locationPermissionStatus.status===PermissionStatus.DENIED){
        Alert.alert("Allow Permission","YOu have to allow location access to use the feature")
    }

    return true ;
}



async function  handleCurrentLocation(){

    let hasPermission= await handlePermission();

    if(hasPermission){
        let mapLocation=await getCurrentPositionAsync({})
        setLocation({                                              //setting the location co-ordinates
            lat: mapLocation.coords.latitude,
            lon: mapLocation.coords.longitude
        })
    }
        
}

function handleMapLocation(){
       navigation.navigate('map') 
}


useEffect(() => {
route.params &&
    setLocation({
        lat:route.params.latitude,
        lon:route.params.longitude
    })
 
}, [isfocused])


useEffect(() => {
    getLocationInfo(location);
  
}, [location])



  return (
    <View>
        <View style={Styles.map} >
            { location?
            // <ActivityIndicator   size="large" color="black" />
            <Image   style={Styles.image}  source={{uri:getMap(location.lat,location.lon)._z}}/>
                :
                <Text>Select a location</Text>

            }
        </View>
      <View style={Styles.Actions} >
        <Button title="Locate User"  onPress={handleCurrentLocation} />
        <Button title="Pick on Map"  onPress={handleMapLocation} />
      </View>
    </View>
  )
}

const Styles=StyleSheet.create({
    map:{
        width:"100%",
        height:200,
        marginVertical:12,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        backgroundColor:"grey",
        borderRadius:8,
        fontSize:18,
        overflow:"hidden"
    },
    image:{
            width:"100%",
            height:"100%"
    },
    Actions:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    }
})