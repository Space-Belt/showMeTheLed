import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import PlayCircle from '../../assets/icons/playCircle.svg';
import {COLORS} from '../../theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  play: boolean;
  setPlay: Dispatch<SetStateAction<boolean>>;
};

const ContentInput = ({content, setContent, play, setPlay}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={text => setContent(text)}
        style={styles.textStyle}
      />
      <TouchableOpacity onPress={() => setPlay(prev => !prev)}>
        <PlayCircle width={40} height={40} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default ContentInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    backgroundColor: COLORS.FIRST,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#765c5c',
  },
  textStyle: {
    flex: 1,
    borderWidth: 0,
  },
  iconStyle: {},
});
