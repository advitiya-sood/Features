import { View, Text, Alert } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import CustomIcon from '../Components/CustomIcon';

export default function MapScreen({navigation}) {
    const [pickedLocation,setPickedLocation]=useState();

     function handleMarker(event){
        
        setPickedLocation({
            latitude:event.nativeEvent.coordinate.latitude,
            longitude:event.nativeEvent.coordinate.longitude
        })
    }


    const handleSave = useCallback(()=>{                        //just like useMemo hook used to increase efficiency
        if(!pickedLocation){
            Alert.alert("Pick Location","Please pick a location in the map.")
            return;
        }
        
        navigation.navigate("addPlace",pickedLocation)
    },[pickedLocation])


    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight:()=><CustomIcon name="save-outline" size={26} color="black" 
             onPress={handleSave}
            />
        })
     
    }, [pickedLocation])
    

  return (
        <MapView onPress={handleMarker} style={{width:"100%",height:"100%"}}
            initialRegion={{
                latitude: 28.679079,
                longitude: 77.069710,
                latitudeDelta: 0.3922,
                longitudeDelta: 0.3421,
                }}
         >
           { pickedLocation && <Marker  coordinate={{latitude:pickedLocation.latitude, 
                      longitude:pickedLocation.longitude}} />}
         </MapView>
   
  )
}