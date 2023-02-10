import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from 'expo-image-picker'

import Button from "./components/Button";

const placeholderImageSource = require('./assets/images/background-image.png')


export default function App() {

  let [selectedImage, setSelectedImage] = useState(null)
  
  const PickerImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!(result).canceled) {
      setSelectedImage(result.assets[0])
    } else {
      Alert.alert('Hmmm', 'No changes applied, select an image')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={placeholderImageSource} selectedImage={selectedImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='primary' label="Choose a photo" onPress={PickerImageAsync} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  }, 
  footerContainer:{
    flex: 1 / 3,
    alignItems:"center",
  },
});
