import { Dimensions } from 'react-native';

export const getHeightRatio = (height, width) => {
  return height * (getWidthOffset()/width);
}

export const getWidthOffset = () => {
  return Dimensions.get('window').width - 20;
}
