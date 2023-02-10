import { StyleSheet, Image} from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const images = selectedImage !==null ? selectedImage : placeholderImageSource
    return (
        <Image source={images} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 19,
    },
})