import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Button, ButtonText } from '../theming/masterStyle'
import { ImageUploadArea, ProfileImage } from '../theming/createStyle'

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log("set image")
      console.log(props)
      props.setImageURI(result.uri)
    }
  };
  const takeImage = async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
          }
      }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        setImage(result.uri);
        console.log("set image")
        console.log(props)
        props.setImageURI(result.uri)
    }
  };

  return (
    <ImageUploadArea>
        {image && <ProfileImage source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="select image" onPress={pickImage}>
      <ButtonText>pick image...</ButtonText>    
      </Button>
      <Button title="take image" onPress={takeImage}>
      <ButtonText>take a photo...</ButtonText>    
      </Button>
      
    </ImageUploadArea>
  );
}