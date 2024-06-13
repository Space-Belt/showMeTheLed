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

type Props = {};

const HomeScreen = (props: Props) => {
  const [text, setText] = React.useState<string>('아아아');

  const [play, setPlay] = React.useState<boolean>(false);

  const [backgroundColor, setBackgroundColor] = React.useState<
    string | undefined
  >();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSettingBtn = useCallback(() => {
    navigation.navigate('Setting');
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Header handleSettingBtn={handleSettingBtn} />
      <ContentShow text={text} backgroundColor={backgroundColor} />
      <ContentInput
        play={play}
        setPlay={setPlay}
        setText={setText}
        text={text}
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
