import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../theme/theme';

type Props = {
  textSize: number;
  textColor: string;
};
const fontColorList: string[] = [
  '#FF6F61',
  '#3EB489',
  '#4169E1',
  '#FFD700',
  '#E6E6FA',
  '#800020',
  '#FA8072',
  '#39FF14',
  '#CCFF00',
  '#FF1493',
  '#FF5F1F',
  '#08E8DE',
  '#BF00FF',
  '#FF073A',
];

const fontSizeList: number[] = [30, 45, 60, 75, 90];

const FontStylingBox = (props: Props) => {
  const handleBackground = (color: string): StyleProp<ViewStyle> => {
    return {
      backgroundColor: color,
    };
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.firstCategoryWrapper}>
          <Text style={styles.categoryText}>글씨크기</Text>
        </View>
        <View style={styles.selectableContainer}>
          {fontSizeList.map(sizeEl => (
            <TouchableOpacity style={styles.selectableWrapper} key={sizeEl}>
              <Text>{sizeEl / 30}x</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryText}>글씨색상</Text>
        </View>
        <View style={styles.selectableContainer}>
          {fontColorList.map(sizeEl => (
            <TouchableOpacity
              style={[styles.selectableWrapper, handleBackground(sizeEl)]}
              key={sizeEl}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FontStylingBox;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 400,
  },
  selectorWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  firstCategoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryText: {
    fontWeight: '700',
    marginBottom: 10,
  },
  selectableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectableWrapper: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.THIRD,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
