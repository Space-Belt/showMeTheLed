import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  selectedBackgroundColor: string | undefined;
  setSelectedBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
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
}: Props) => {
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
        <Text>배경색</Text>
        <View style={styles.selectorWrapper}>
          {backgroundChoices.map((colorEl, index) => (
            <View style={{flexBasis: '22%', margin: 3}}>
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
  colorContent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: '#997e7e',
  },
});
