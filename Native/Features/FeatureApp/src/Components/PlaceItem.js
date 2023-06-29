import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { Tile } from '@rneui/themed';
import React from 'react'

export default function PlaceItem({place,onPress}) {
  return (
    <Pressable onPress={onPress} >
        <View style={Styles.itemContainer} >
        <Tile
            imageSrc={{uri:place.item.imageUrl}} 
            title={place.item.title}
            titleStyle={{ fontSize: 20, textAlign: 'center', fontWeight:"700", paddingBottom: 5}}
            activeOpacity={1}
            width={360}
            contentContainerStyle={{ height: 135,backgroundColor:"#EBDEF0" }}
          >
            <View style={{marginVertical:8}} ><Text>{place.item.address}</Text></View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'green',fontSize:16,fontWeight:"600" }}>Visit</Text>
              <Text style={{ color: '#397af8',fontSize:16,fontWeight:"600" }}>Find out More</Text>
            </View>
          </Tile>
        </View>
    </Pressable>
  )
}


const Styles = StyleSheet.create({
  itemContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:12,
    margin:12,
    
  },
  subHeader: {
    backgroundColor : "#2089dc",
    color : "white",
    textAlign : "center",
    paddingVertical : 5,
    marginBottom : 10
  }
  });