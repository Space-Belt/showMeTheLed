import {Dimensions} from 'react-native';

export function getWindowWidth() {
  const {width} = Dimensions.get('window');
  return width;
}
