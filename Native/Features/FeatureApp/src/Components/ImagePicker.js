import { View, Text, Button } from 'react-native'
import React from 'react'

export default function ImagePicker({onPress}) {
  return (
    <View>
      <Button title="Open Camera"  onPress={onPress} />
    </View>
  )
}