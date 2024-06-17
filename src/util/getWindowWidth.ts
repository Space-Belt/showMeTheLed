import {Dimensions} from 'react-native';

export function getWindowWidth() {
  const {width, height} = Dimensions.get('window');
  return {width, height};
}
