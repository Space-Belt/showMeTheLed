import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {COLORS} from '../../theme/theme';
import Tab from './Tab';
import FontStylingBox from './TabContent/FontStylingBox';
import BackgroundStylingBox from './TabContent/BackgroundStylingBox';
import EffectStylingBox from './TabContent/EffectStylingBox';
import {Asset} from 'react-native-image-picker';

type Props = {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
  backgroundColor: string | undefined;
  setBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  colorPickerModal: boolean;
  setColorPickerModal: Dispatch<SetStateAction<boolean>>;
  backgroundImg: Asset | undefined;
  setBackgroundImg: Dispatch<SetStateAction<Asset | undefined>>;
  textSize: number;
  setTextSize: Dispatch<SetStateAction<number>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
};

const EffectSelectBox = ({
  selectedTabIndex,
  setSelectedTabIndex,
  backgroundColor,
  setBackgroundColor,
  colorPickerModal,
  setColorPickerModal,
  backgroundImg,
  setBackgroundImg,
  textSize,
  setTextSize,
  textColor,
  setTextColor,
}: Props) => {
  return (
    <View style={styles.container}>
      <Tab
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
      {selectedTabIndex === 0 ? (
        <BackgroundStylingBox
          selectedBackgroundColor={backgroundColor}
          setSelectedBackgroundColor={setBackgroundColor}
          setColorPickerModal={setColorPickerModal}
          backgroundImg={backgroundImg}
          setBackgroundImg={setBackgroundImg}
        />
      ) : selectedTabIndex === 1 ? (
        <FontStylingBox
          textSize={textSize}
          setTextSize={setTextSize}
          textColor={textColor}
          setTextColor={setTextColor}
        />
      ) : (
        <EffectStylingBox />
      )}
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
