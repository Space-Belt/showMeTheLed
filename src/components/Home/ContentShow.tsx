import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Asset} from 'react-native-image-picker';

type Props = {
  text: string;
  backgroundColor?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundImg?: Asset | undefined;
};

const ContentShow = ({
  text,
  backgroundColor,
  fontSize,
  fontColor,
  backgroundImg,
}: Props) => {
  const backgroundStyle: StyleProp<ViewStyle> = backgroundColor
    ? {
        backgroundColor: backgroundColor,
      }
    : {};

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
          style={[styles.textBasicStyle]}>
          {text}
        </Text>
      </ImageBackground>
    );
  }

  // http://www.starsvalley.com/star/data/sub3_31/23$1$%EC%9D%80%ED%95%98%EC%88%98.jpg

  return (
    <View style={[styles.containerBasicStyle, backgroundStyle]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[styles.textBasicStyle]}>
        {text}
      </Text>
    </View>
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
    overflow: 'hidden',
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
