import React, {Dispatch, SetStateAction} from 'react';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';
import {getWindowWidth} from '../../util/getWindowWidth';

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
  const [layout, onLayout] = useLayout();

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

  const absoluteLeft = -width / 2 - layout.height / 2;

  const textRotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      overflow: play ? 'visible' : 'hidden',
      width: play ? height : 'auto',
      position: play ? 'absolute' : 'relative',
      left: play ? absoluteLeft : 0,
      transform: [
        {
          rotate: `${textRotateValue.value}deg`,
        },
      ],
    };
  });

  React.useEffect(() => {
    console.log(layout);
  }, [layout]);

  React.useEffect(() => {
    if (play) {
      widthValue.value = withTiming(width, {duration: 1000});
      heightValue.value = withTiming(height, {duration: 1000});
      boxRotateValue.value = withTiming(-180, {duration: 1000});
      textRotateValue.value = withTiming(-270, {duration: 1000});
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

  const btnStyle: StyleProp<ViewStyle> = {
    position: play ? 'absolute' : 'relative',
    zIndex: play ? 1000 : 0,
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
      style={btnStyle}>
      <Animated.View
        style={[
          styles.containerBasicStyle,
          backgroundStyle,
          rotateAnimatedStyle,
        ]}>
        <Animated.Text
          numberOfLines={1}
          onLayout={onLayout}
          ellipsizeMode="clip"
          style={[styles.textBasicStyle, fontStyle, textRotateAnimatedStyle]}>
          {text}
        </Animated.Text>
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
    width: '100%',
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
