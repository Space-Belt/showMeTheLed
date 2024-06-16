import React, {Dispatch, SetStateAction} from 'react';
import {
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {COLORS} from '../../../theme/theme';
import Gallery from '../../../assets/icons/galleryIcon.svg';
import Trash from '../../../assets/icons/deleteIcon.svg';

type Props = {
  selectedBackgroundColor: string | undefined;
  setSelectedBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  setColorPickerModal: Dispatch<SetStateAction<boolean>>;
  backgroundImg: Asset | undefined;
  setBackgroundImg: Dispatch<SetStateAction<Asset | undefined>>;
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

const imagePickerOption = {
  mediaType: 'photo',
  includeBase64: Platform.OS === 'android',
  selectionLimit: 1,
};

const BackgroundStylingBox = ({
  selectedBackgroundColor,
  setSelectedBackgroundColor,
  setColorPickerModal,
  backgroundImg,
  setBackgroundImg,
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

  const onPickImage = (res: any) => {
    // console.log(res);
    if (res.didCancel || !res) {
      return;
    }
    let temp: Asset | undefined = {
      ...res.assets[0],
      uri:
        Platform.OS === 'android'
          ? res.assets[0].uri
          : res.assets[0].uri!.replace('file://', ''),
    };
    console.log(temp);

    setBackgroundImg(temp);

    console.log('dfdsf');
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.firstCategoryWrapper}>
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
        <View style={styles.categoryWrapper}>
          <Text style={styles.categoryText}>사진배경</Text>
        </View>
        <TouchableOpacity onPress={onLaunchImageLibrary}>
          <View style={styles.galleryBtn}>
            <Gallery width={30} height={30} style={styles.galleryIocn} />
            <Text style={styles.galleryText}>사진 선택하기</Text>
          </View>
        </TouchableOpacity>
        {backgroundImg && (
          <TouchableOpacity onPress={() => setBackgroundImg(undefined)}>
            <View style={styles.deleteBtn}>
              <Trash width={30} height={30} style={styles.galleryIocn} />
              <Text style={styles.galleryText}>사진 없애기</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default BackgroundStylingBox;

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
  galleryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3765ca1',
    paddingVertical: 10,
    borderRadius: 20,
  },
  galleryIocn: {
    width: 30,
    height: 30,
    color: 'white',
    marginRight: 10,
  },
  galleryText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  deleteBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.THIRD,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
