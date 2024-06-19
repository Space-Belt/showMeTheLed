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
  FadeIn,
  FadeOut,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useLayout} from '../../hooks/useLayout';
import {getWindowWidth} from '../../util/getWindowWidth';
import FastImage from 'react-native-fast-image';

type Props = {
  text: string;
  play: boolean;
  setPlay: Dispatch<SetStateAction<boolean>>;
  textSpeed: number;
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
  textSpeed,
  backgroundColor,
  textSize,
  textColor,
  backgroundImg,
}: Props) => {
  const [layout, onLayout] = useLayout();

  const boxRotateValue = useSharedValue(0);

  const textRotateValue = useSharedValue(0);
  const translateValue = useSharedValue(-height);

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

  const backgroundImageStyle: StyleProp<ViewStyle> = {
    width: play && !backgroundColor ? height : 'auto',
    height: play && !backgroundColor ? width : 150,
    position: play ? 'absolute' : 'relative',

    transform: [
      {
        rotate: play ? '90deg' : '0deg',
      },
    ],
  };

  const absoluteLeft =
    textSize && textSize >= 80
      ? -width / 2 - layout.height / 4
      : -width / 2 - layout.height / 2 - 15;

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

  const transLateAnimatedStyle = useAnimatedStyle(() => {
    if (play) {
      return {
        top: translateValue.value,
      };
    } else {
      return {
        top: 0,
      };
    }
  });

  React.useEffect(() => {
    if (play) {
      // if (backgroundColor) {
      widthValue.value = withTiming(width, {duration: 1000});
      heightValue.value = withTiming(height, {duration: 1000});
      boxRotateValue.value = withTiming(-180, {duration: 1000});
      textRotateValue.value = withTiming(-270, {duration: 1000});
      setTimeout(() => {
        translateValue.value = withRepeat(
          withSequence(
            withTiming(-height, {duration: 0}),
            withTiming(height * 1.5, {duration: 10000}),
          ),
          -1,
        );
      }, 1000);
      // }

      // imageBoxRotateValue.value = withTiming(90, {duration: 1000});
    } else {
      cancelAnimation(translateValue);
      widthValue.value = withTiming(width - 40, {duration: 1000});
      heightValue.value = withTiming(150, {duration: 1000});
      boxRotateValue.value = withTiming(0, {duration: 1000});
      textRotateValue.value = withTiming(0, {duration: 1000});
    }
  }, [play, backgroundColor]);

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

  if (backgroundImg !== undefined && !play) {
    return (
      <TouchableOpacity
        onPress={() => {
          setPlay(prev => !prev);
        }}
        style={[btnStyle, backgroundImageStyle]}>
        <ImageBackground
          source={{
            uri: backgroundImg.uri,
          }}
          imageStyle={styles.imageStyle}
          style={[styles.backgroundImageStyle, play && backgroundImageStyle]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={[styles.textBasicStyle, fontStyle]}>
            {text}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  if (backgroundImg !== undefined && play) {
    return (
      <TouchableOpacity
        onPress={() => {
          setPlay(prev => !prev);
        }}
        style={btnStyle}>
        <Animated.Image
          source={{uri: backgroundImg.uri}}
          style={[styles.containerBasicStyle, rotateAnimatedStyle]}
        />
        <Animated.Text
          style={[
            {
              transform: [
                {
                  rotate: '270deg',
                },
              ],
              zIndex: 1000,
              overflow: play ? 'visible' : 'hidden',
              width: play ? height : 'auto',
              position: play ? 'absolute' : 'relative',
              left: play ? absoluteLeft : 0,
            },
            fontStyle,
            transLateAnimatedStyle,
          ]}>
          {text}
        </Animated.Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setPlay(prev => !prev);
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
          style={[
            styles.textBasicStyle,
            fontStyle,
            textRotateAnimatedStyle,
            transLateAnimatedStyle,
          ]}>
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
    width: '100%',
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
