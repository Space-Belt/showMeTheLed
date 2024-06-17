import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const EffectStylingBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>EffectStylingBox</Text>
    </View>
  );
};

export default EffectStylingBox;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
