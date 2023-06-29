import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ImagePicker from '../Components/ImagePicker'
import { PermissionStatus, launchCameraAsync, useCameraPermissions } from 'expo-image-picker'
import LocationPicker from '../Components/LocationPicker';
import { Button, Icon } from '@rneui/base';
import { Place } from '../Model/place';

export default function AddPlace({navigation}) {
    const [cameraPermissionStatus,requestPermission]=useCameraPermissions();
    const [imageUri,setImageUri]=useState();
    const [form,setForm]=useState({
        title:"",
        image:"",
        location:"",
        address:""
    })
    


const handlePermission=async()=>{
    if(cameraPermissionStatus.status===PermissionStatus.UNDETERMINED){   //permission status is not known
        const permissionResponse=  await requestPermission(); 
        return permissionResponse.granted;  //returns true on false based on user choise 
    }

    if(cameraPermissionStatus.status===PermissionStatus.DENIED){   //if the permission is denied
            // Alert.alert("Insufficient Permission",
            // "You need to grant camera permission to use this app");
            const permissionResponse=  await requestPermission(); 
            return permissionResponse.granted;  
    }
    return true;
}

const  handleImagePicker= async()=>{
    const hasPermission= await handlePermission();
    if(!hasPermission){
        return;
    }

    const camera= await launchCameraAsync({
        allowsEditing: true,
        aspect:[16,9],
        quality:0.5,
    })
    setImageUri(camera.uri)
    setForm({...form,["image"]:camera.uri})
}

const handleReadableLocation= async()=>{
   const response= await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${form.location.lat}&lon=${form.location.log}&apiKey=dc913449a4d04dbfb5882381a98f7a7b`)

   if(!response.ok){
    throw new Error("Filed to fetch data")
   }
    const data= await response.json();
    const address=data.features[0].properties.formatted;
    return address; 
}



useEffect(() => {
    async function helper(){
        if(form.location){
            const addr=  await handleReadableLocation();
            setForm({...form,["address"]:addr})
            }
    }
    helper()
}, [form.location])


const handleSave=()=>{
    const place= new Place(form.title,form.image,form.address,form.location);
    navigation.navigate("allPlaces",place)
}


let imageBox=<Text  style={Styles.image} >Please take a photo</Text>

if(imageUri){
    imageBox=<Image  style={Styles.image} source={{uri:imageUri}} />
}

  return (
    <View style={Styles.container} >
      <TextInput placeholder='Title'  onChangeText={(text)=>setForm({...form,["title"]:text})} 
      style={Styles.input} />
      {imageBox}
      <ImagePicker  onPress={handleImagePicker}  />
      <LocationPicker   getLocationInfo={(loc)=>setForm({...form,["location"]:loc})} />
        <View style={{position:"relative", bottom:-65}} >

      <Button radius={'sm'} color="#D2BBDC"  type="solid" onPress={handleSave} style={Styles.saveButton}  >
           <Text style={{fontSize:18, fontWeight:"600" }} >Save</Text>
            <Icon name="save" color="black"  />
        </Button>
        </View>
    </View>
  )
}


const Styles=StyleSheet.create({
    container:{
        flex:1,
        margin:12,
    },
    input:{
        backgroundColor:"#D2BBDC",
        height:50,
        borderRadius:8,
        fontSize:24,
        padding:12,
        marginBottom:12
    },
    image:{
        width:"100%",
        height:200,
        marginBottom:12,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        backgroundColor:"grey",
        borderRadius:8,
        fontSize:18
    },
    saveButton:{
        width:"80%",
        color:"black"
        
    }
})