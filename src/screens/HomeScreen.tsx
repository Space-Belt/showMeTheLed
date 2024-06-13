import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../theme/theme';

import Setting from '../assets/icons/settingIcon.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSettingBtn = () => {
    navigation.navigate('Setting');
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={handleSettingBtn}>
          <Setting style={styles.settingIcon} />
        </TouchableOpacity>
      </View>
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
  headerWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  settingIcon: {
    width: 25,
    height: 25,
    color: COLORS.SECOND,
  },
});
