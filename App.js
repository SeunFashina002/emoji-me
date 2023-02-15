import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from 'expo-image-picker'

import Button from "./components/Button";
import { CircleButton } from "./components/CircleButton";
import { IconButton } from "./components/IconButton";
import { EmojiPicker } from "./components/EmojiPicker";
import { EmojiList } from "./components/EmojiList";
import { EmojiSticker } from "./components/EmojiSticker";

const placeholderImageSource = require('./assets/images/background-image.png')


export default function App() {

  let [showAppOptions, setShowAppOptions] = useState(false)
  let [selectedImage, setSelectedImage] = useState(null)
  let [isModalVisible, setIsModalVisible] = useState(false)
  let [pickedEmoji, setPickedEmoji] = useState(null)
  
  const PickerImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!(result).canceled) {
      setSelectedImage(result.assets[0])
      setShowAppOptions(true)
    } else {
      Alert.alert('Hmmm', 'No changes applied, select an image')
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true)
  };

  const onSaveImageSync = async () => {
    console.log("");
  };

  const onModalClose = () => {
    setIsModalVisible(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={placeholderImageSource}
          selectedImage={selectedImage}
        />
        {pickedEmoji !== null ? <EmojiSticker stickerSource={pickedEmoji} stickerSize={60} /> : null }
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              label="Save"
              icon="save-alt"
              onPress={onSaveImageSync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={PickerImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="light" />
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
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
