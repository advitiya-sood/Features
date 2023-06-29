import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './src/Screens/AllPlaces';
import AddPlace from './src/Screens/AddPlace';
import { NavigationContainer } from '@react-navigation/native';
import CustomIcon from './src/Components/CustomIcon';
import MapScreen from './src/Screens/MapScreen';
import { init } from './src/Util/database';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';

export default function App() {


const Stack=createNativeStackNavigator();
const [loading, setLoading]=useState(true);


useEffect(() => {
init()
.then(()=>setLoading(false))
.catch((err)=>console.log("THIIIIIIIIIIIIIIIIIIIII",err))
}, [])

if(loading){
  return <AppLoading/>
}

  return (
    <>
    <StatusBar/>
    <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen  name="allPlaces" 
        options={({navigation})=>({
          headerRight:()=><CustomIcon   name="add" size={36} color="black" 
          onPress={()=>(navigation.navigate("addPlace"))} />
        })}
        component={AllPlaces} />

      <Stack.Screen  name="addPlace"  component={AddPlace} />
      <Stack.Screen  name="map" component={MapScreen} />


    </Stack.Navigator>
    </NavigationContainer>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
