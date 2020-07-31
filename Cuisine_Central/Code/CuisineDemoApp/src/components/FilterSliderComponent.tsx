import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {View, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {baseStyle, FilterScreenStyle} from '../style/BaseStyleSheet';

interface Props {
  searchRadiusKey: number;
  radiusCallback: Function;
}

const FilterSlider = (props: Props) => {
  const [searchRadiusKey, setSearchRadiusKey] = useState(props.searchRadiusKey);

  const setSearchRadius = (val: number) => {
    props.radiusCallback(val);
    setSearchRadiusKey(val);
    setSearchRadiusText(getText(val));
  };

  const getText = (val: number) => {
    switch (val) {
      case 1:
        return '500 Meters';
      case 2:
        return '1 KM';
      case 3:
        return '2 KMs';
      case 4:
        return '3 KMs';
      case 5:
        return '5 KMs';
      case 6:
        return '10 KMs';
      default:
        return '1 KM';
    }
  };

  const [searchRadiusText, setSearchRadiusText] = useState(
    getText(props.searchRadiusKey),
  );

  return (
    <View style={FilterScreenStyle.filterSliderStyle}>
      <Text style={FilterScreenStyle.radiusTextStyle}>Search Radius: </Text>
      <Slider
        style={{width: 150, height: 40}}
        minimumValue={1}
        maximumValue={6}
        step={1}
        value={searchRadiusKey}
        onValueChange={setSearchRadius}
        thumbTintColor={Colors.primary}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.primary}
      />
      <Text>{searchRadiusText}</Text>
    </View>
  );
};

export default FilterSlider;
