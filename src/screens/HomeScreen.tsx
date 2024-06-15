import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../theme/theme';

import Setting from '../assets/icons/settingIcon.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import Header from '../components/Home/Header';
import ContentShow from '../components/Home/ContentShow';
import ContentInput from '../components/Home/ContentInput';
import EffectSelectBox from '../components/Home/EffectSelectBox';
import ColorPickerModal from '../components/Home/ColorPickerModal';
import {returnedResults} from 'reanimated-color-picker';
import {Asset} from 'react-native-image-picker';

type Props = {};

const HomeScreen = (props: Props) => {
  const [text, setText] = React.useState<string>('');

  const [play, setPlay] = React.useState<boolean>(false);

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const [backgroundColor, setBackgroundColor] = React.useState<
    string | undefined
  >('#AEC6CF');

  const [colorPickerModal, setColorPickerModal] =
    React.useState<boolean>(false);

  const [backgroundImg, setBackgroundImg] = React.useState<Asset>();

  const [textSize, setTextSize] = React.useState<number>(60);

  const [textColor, setTextColor] = React.useState<string>('#000');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSettingBtn = useCallback(() => {
    navigation.navigate('Setting');
  }, []);

  const selectColor = (color: returnedResults) => {
    setBackgroundColor(color.hex);
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header handleSettingBtn={handleSettingBtn} />
      <ContentShow
        text={text}
        backgroundColor={backgroundColor}
        backgroundImg={backgroundImg}
      />
      <ContentInput
        play={play}
        setPlay={setPlay}
        content={text}
        setContent={setText}
      />
      <EffectSelectBox
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
        colorPickerModal={colorPickerModal}
        setColorPickerModal={setColorPickerModal}
        backgroundImg={backgroundImg}
        setBackgroundImg={setBackgroundImg}
      />
      <ColorPickerModal
        showModal={colorPickerModal}
        setShowModal={setColorPickerModal}
        onSelectColor={selectColor}
        onClose={() => {
          setColorPickerModal(prev => !prev);
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.FIRST,
    flex: 1,
  },
});
