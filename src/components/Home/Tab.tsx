import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useLayout} from '../../hooks/useLayout';
import {getWindowWidth} from '../../util/getWindowWidth';

type Props = {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
};

const tabs: string[] = ['배경화면', '글씨', '효과'];

const Tab = ({selectedTabIndex, setSelectedTabIndex}: Props) => {
  const [layout, onLayout] = useLayout();

  const tabWidthStyle: StyleProp<ViewStyle> = {
    width: layout?.width / 3,
  };

  const handleTabStyle = (indexNum: number): StyleProp<TextStyle> => {
    if (indexNum === selectedTabIndex) {
      return {
        color: 'skyblue',
        fontWeight: '700',
      };
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {tabs.map((el, index) => (
        <TouchableOpacity
          key={el}
          style={[styles.tabStyle]}
          onPress={() => setSelectedTabIndex(index)}>
          <Text
            style={[styles.textStyle, handleTabStyle(index), tabWidthStyle]}>
            {el}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#c4c0c0',
  },
  tabStyle: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  textStyle: {
    color: '#7a7474',
    textAlign: 'center',
  },
});
