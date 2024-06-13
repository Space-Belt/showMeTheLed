import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/theme';
import Tab from './Tab';
import {useLayout} from '../../hooks/useLayout';
import {getWindowWidth} from '../../util/getWindowWidth';

type Props = {};

const EffectSelectBox = (props: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  return (
    <View style={styles.container}>
      <Tab
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
    </View>
  );
};

export default EffectSelectBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.FIRST,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#765c5c',
  },
});
