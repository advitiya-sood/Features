import { View, Text, Alert } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import CustomIcon from '../Components/CustomIcon';
import { useRoute } from '@react-navigation/native';

export default function MapScreen({navigation}) {
    const [pickedLocation,setPickedLocation]=useState();
    const route=useRoute()

     function handleMarker(event){                   //cannot change the marker position if promted from the card
        if(route.params){
            return;
        }
        setPickedLocation({
            latitude:event.nativeEvent.coordinate.latitude,
            longitude:event.nativeEvent.coordinate.longitude
        })
    }

    useEffect(() => {                         //setting location when inititaed from card
        if(route.params){
            navigation.setOptions({
                title:route.params.title
            })
            setPickedLocation({
                latitude:route.params.location.lat,
                longitude:route.params.location.lng
            })
        }     
    }, [route.params])
    

    const handleSave = useCallback(()=>{                        //just like useMemo hook used to increase efficiency
        if(!pickedLocation){
            Alert.alert("Pick Location","Please pick a location in the map.")
            return;
        }
        
        navigation.navigate("addPlace",pickedLocation)
    },[pickedLocation])


    useLayoutEffect(() => {                   //setting the save icon

            if(!route.params){
                navigation.setOptions({
                    title:"Select the location",
                    headerRight:()=><CustomIcon name="save-outline" size={26} color="black" 
                    onPress={handleSave}
                    />
                })
            }
        
    }, [pickedLocation,route.params])
    

  return (
        <MapView onPress={handleMarker} style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: (route.params)?route.params.location.lat:28.679079,
                longitude: (route.params)?route.params.location.lng:77.069710,
                latitudeDelta: 9.3922,
                longitudeDelta: 9.3421,
                }}
         >
           { pickedLocation && <Marker  coordinate={{latitude:pickedLocation.latitude, 
                      longitude:pickedLocation.longitude}} />}
         </MapView>
   
  )
}