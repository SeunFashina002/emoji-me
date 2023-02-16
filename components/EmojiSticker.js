import { View, Image } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";


const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export const EmojiSticker = ({ stickerSource, stickerSize }) => {
    const scaleImage = useSharedValue(stickerSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            if (scaleImage.value) {
                scaleImage.value = scaleImage.value * 2
            }
        }
    })

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        }
    })
    const imageStyle = useAnimatedStyle(() => {
        return {
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value),
        };
    })

    const containerStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
          {
            translateY: translateY.value,
          },
        ],
      };
    });

    return (
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView style={[containerStyle, { top: -350, left: 100 }]}>
          <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
            <AnimatedImage
              source={stickerSource}
              resizeMode="contain"
              style={[imageStyle, { width: stickerSize, height: stickerSize }]}
            />
          </TapGestureHandler>
        </AnimatedView>
      </PanGestureHandler>
    );
}