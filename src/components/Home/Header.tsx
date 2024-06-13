import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Setting from '../../assets/icons/settingIcon.svg';
import {COLORS} from '../../theme/theme';

type Props = {
  handleSettingBtn: () => void;
};

const Header = React.memo(({handleSettingBtn}: Props) => {
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={handleSettingBtn}>
        <Setting style={styles.settingIcon} />
      </TouchableOpacity>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
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
