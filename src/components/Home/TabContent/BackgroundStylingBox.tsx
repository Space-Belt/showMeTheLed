import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../theme/theme';

type Props = {
  selectedBackgroundColor: string | undefined;
  setSelectedBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  colorPickerModal: boolean;
  setColorPickerModal: Dispatch<SetStateAction<boolean>>;
};

const backgroundChoices: string[] = [
  '#AEC6CF',
  '#FFD1DC',
  '#FFB347',
  '#B39EB5',
  '#77DD77',
  '#FF6961',
  '#FDFD96',
  '#CB99C9',
];

const BackgroundStylingBox = ({
  selectedBackgroundColor,
  setSelectedBackgroundColor,
  colorPickerModal,
  setColorPickerModal,
}: Props) => {
  const selfColor: StyleProp<ViewStyle> = {
    backgroundColor: !backgroundChoices.find(
      el => el === selectedBackgroundColor,
    )
      ? selectedBackgroundColor
      : '#fff',
  };

  const handleSelectedColorStyle = (
    colorElement: string,
  ): StyleProp<ViewStyle> => {
    if (selectedBackgroundColor === colorElement) {
      return {
        borderWidth: 3,
        borderColor: '#997e7e',
      };
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryText}>배경색</Text>
          <View style={styles.selfColorWrapper}>
            <TouchableOpacity
              onPress={() => {
                setColorPickerModal(prev => !prev);
              }}
              style={[
                styles.selfColorContent,
                selfColor,
                !backgroundChoices.find(el => el === selectedBackgroundColor) &&
                selectedBackgroundColor !== undefined
                  ? handleSelectedColorStyle(selectedBackgroundColor)
                  : {},
              ]}>
              {!backgroundChoices.find(
                el => el === selectedBackgroundColor,
              ) && <Text style={styles.seltSelectedText}>선택</Text>}
            </TouchableOpacity>
            <Text style={styles.selfText}>직접 고르기</Text>
          </View>
        </View>
        <View style={styles.selectorWrapper}>
          {backgroundChoices.map(colorEl => (
            <View style={styles.colorWrapper} key={JSON.stringify(colorEl)}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedBackgroundColor(colorEl);
                }}
                style={[
                  styles.colorContent,
                  {
                    backgroundColor: colorEl,
                  },
                  handleSelectedColorStyle(colorEl),
                ]}>
                {selectedBackgroundColor === colorEl && (
                  <Text style={styles.selectedText}>선택</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BackgroundStylingBox;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  selectorWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: '700',
    marginBottom: 10,
  },
  colorWrapper: {
    flexBasis: '22%',
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfColorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfText: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.THIRD,
  },
  selfColorContent: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: COLORS.THIRD,
  },
  seltSelectedText: {
    fontSize: 8,
    color: COLORS.THIRD,
  },
});
