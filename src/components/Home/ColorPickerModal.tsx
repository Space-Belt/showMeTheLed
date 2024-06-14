import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import ColorPicker, {
  Preview,
  Panel1,
  HueSlider,
  OpacitySlider,
  Swatches,
  returnedResults,
} from 'reanimated-color-picker';
import {COLORS} from '../../theme/theme';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onSelectColor: (args: returnedResults) => void;
  onClose: () => void;
};

const ColorPickerModal = ({
  showModal,
  setShowModal,
  onSelectColor,
  onClose,
}: Props) => {
  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.background}>
          <View style={styles.whiteBox}>
            <Text style={styles.title}>배경색 선택</Text>
            <ColorPicker value="yellow" onComplete={onSelectColor}>
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
            <TouchableOpacity onPress={onClose} style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>선택하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ColorPickerModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1a090962',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  title: {
    backgroundColor: COLORS.FIRST,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 10,
  },
  colorPickerStyle: {
    borderRadius: 20,
  },
  confirmBtn: {
    backgroundColor: COLORS.FIRST,
    paddingVertical: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  confirmBtnText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
});
