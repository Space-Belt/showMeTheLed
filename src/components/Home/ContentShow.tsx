import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Asset} from 'react-native-image-picker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {getWindowWidth} from '../../util/getWindowWidth';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type Props = {
  text: string;
  play: boolean;
  setPlay: Dispatch<SetStateAction<boolean>>;
  backgroundColor?: string;
  textSize?: number;
  textColor?: string;
  backgroundImg?: Asset | undefined;
};

const {width, height} = getWindowWidth();

const ContentShow = ({
  text,
  play,
  setPlay,
  backgroundColor,
  textSize,
  textColor,
  backgroundImg,
}: Props) => {
  const boxRotateValue = useSharedValue(0);
  const textRotateValue = useSharedValue(0);

  const widthValue = useSharedValue(width - 40);

  const heightValue = useSharedValue(150);

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: widthValue.value,
      height: heightValue.value,
      position: play ? 'absolute' : 'relative',
      transform: [
        {
          rotate: `${boxRotateValue.value}deg`,
        },
      ],
      zIndex: play ? 100 : 0,
    };
  });

  const textRotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      overflow: play ? 'visible' : 'hidden',
      transform: [
        {
          rotate: `${textRotateValue.value}deg`,
        },
      ],
    };
  });

  React.useEffect(() => {
    if (play) {
      widthValue.value = withTiming(width, {duration: 1000});
      heightValue.value = withTiming(height, {duration: 1000});
      boxRotateValue.value = withTiming(-180, {duration: 1000});
      textRotateValue.value = withTiming(90, {duration: 1000});
    } else {
      widthValue.value = withTiming(width - 40, {duration: 1000});
      heightValue.value = withTiming(150, {duration: 1000});
      boxRotateValue.value = withTiming(0, {duration: 1000});
      textRotateValue.value = withTiming(0, {duration: 1000});
    }
  }, [play]);

  const backgroundStyle: StyleProp<ViewStyle> = backgroundColor
    ? {
        backgroundColor: backgroundColor,
      }
    : {};

  const fontStyle: StyleProp<TextStyle> = {
    fontSize: textSize,
    color: textColor,
  };

  if (backgroundImg !== undefined) {
    return (
      <ImageBackground
        source={{
          uri: backgroundImg.uri,
        }}
        imageStyle={styles.imageStyle}
        style={[styles.backgroundImageStyle]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={[styles.textBasicStyle, fontStyle]}>
          {text}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setPlay(prev => !prev);
        console.log('dfdfdfd');
      }}
      style={{
        position: play ? 'absolute' : 'relative',
        zIndex: play ? 1000 : 0,
      }}>
      <Animated.View
        style={[
          styles.containerBasicStyle,
          backgroundStyle,
          rotateAnimatedStyle,
        ]}>
        {/* <View style={[styles.containerBasicStyle, backgroundStyle]}> */}
        <Animated.Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={[styles.textBasicStyle, fontStyle, textRotateAnimatedStyle]}>
          {text}
        </Animated.Text>
        {/* </View> */}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ContentShow;

const styles = StyleSheet.create({
  containerBasicStyle: {
    borderRadius: 15,
    height: 150,
    justifyContent: 'center',
  },
  textBasicStyle: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  backgroundImageStyle: {
    height: 150,
    justifyContent: 'center',
    width: '100%',
    resizeMode: 'cover',
  },
  imageStyle: {
    borderRadius: 15,
  },
});
