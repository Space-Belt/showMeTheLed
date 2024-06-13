import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  backgroundColor?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundImg?: string | undefined;
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

  if (backgroundImg) {
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
  }

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
    backgroundColor: 'skyblue',
  },
  textBasicStyle: {
    overflow: 'hidden',
    fontSize: 60,
    fontWeight: 'bold',
  },
});
