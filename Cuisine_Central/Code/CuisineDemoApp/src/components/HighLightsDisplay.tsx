import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RestaurantDetailStyle} from '../style/BaseStyleSheet';

interface Props {
  item1: string;
  item2: string;
}

const HighLightDisplay = (props: Props) => {
  const getView = (val: string) => {
    const [icon, color] = getIconAndColor(val);
    return (
      <View style={RestaurantDetailStyle.highlightIconMainStyle}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={RestaurantDetailStyle.highlightIconStyle}>{val}</Text>
      </View>
    );
  };

  const getIconAndColor = (val: string) => {
    const lowerVal = val.toLowerCase();
    if (lowerVal.includes('no ')) {
      return ['close', 'red'];
    } else if (
      lowerVal.includes('above 18 only') ||
      lowerVal.includes('recommended')
    ) {
      return ['exclamation-thick', 'orange'];
    }
    return ['check', 'green'];
  };

  return (
    <View style={RestaurantDetailStyle.highlightStyle}>
      {getView(props.item1)}
      {props.item2 && getView(props.item2)}
    </View>
  );
};

export default HighLightDisplay;
