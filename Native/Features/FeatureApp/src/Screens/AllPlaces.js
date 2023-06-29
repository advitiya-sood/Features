import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlaceItem from '../Components/PlaceItem'
import {useRoute,useIsFocused } from '@react-navigation/native';

export default function AllPlaces() {

const [places,setPlaces]=useState([])
const route=useRoute();

// if(!places || places.length===0){
//     return(
//         <View  style={Styles.fallbackContainer} >
//             <Text>Please add some places</Text>
//         </View>
//     )
// }

useEffect(() => {
    if(route.params){
        setPlaces([...places,route.params])
    }
}, [route.params])


  return (
    <View>
      <FlatList   data={places}  keyExtractor={(item)=>item.id} 
      renderItem={(item)=><PlaceItem  place={item} />} />
    </View>
  )
}


const Styles=StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})