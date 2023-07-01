import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlaceItem from '../Components/PlaceItem'
import {useRoute,useIsFocused } from '@react-navigation/native';
import { fetchData } from '../Util/database';

export default function AllPlaces() {

const [places,setPlaces]=useState([])
const isfocused=useIsFocused()

// if(!places || places.length===0){
//     return(
//         <View  style={Styles.fallbackContainer} >
//             <Text>Please add some places</Text>
//         </View>
//     )
// }

useEffect(() => {
    const fetchHelper=async()=>{                     //fetching the places from the db
      const places= await fetchData()
      setPlaces(places)
    }
    fetchHelper()
}, [isfocused])


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