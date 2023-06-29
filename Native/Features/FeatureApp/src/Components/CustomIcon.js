import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import React from 'react'

export default function CustomIcon({name,size,color,onPress}) {
  return (
    <Pressable onPress={onPress} >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  )
}