import { View, Image } from 'react-native';

export const EmojiSticker = ({stickerSource, stickerSize}) => {
    return (
        <View style={{ top: -350, left: 100}}>
            <Image source={stickerSource} resizeMode='contain' style={{width: stickerSize, height: stickerSize}} />

        </View>
    )
}