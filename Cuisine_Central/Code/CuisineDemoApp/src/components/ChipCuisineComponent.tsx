import React, {useState} from 'react';
import {Chip} from 'react-native-paper';
import {CuisineItem} from '../interfaces';
import {ChipStyle} from '../style/BaseStyleSheet';

interface Props {
  cuisineItem: CuisineItem;
  selectCuisine: Function;
  isSelected: boolean;
}
const ChipCuisineComponent = (props: Props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);

  return (
    <Chip
      style={ChipStyle.chipMainStyle}
      mode="outlined"
      selected={isSelected}
      accessibilityStates=""
      textStyle={ChipStyle.chipTextStyle}
      onPress={() => {
        props.selectCuisine(props.cuisineItem.cuisine.cuisine_id);
        isSelected ? setIsSelected(false) : setIsSelected(true);
      }}>
      {props.cuisineItem.cuisine.cuisine_name}
    </Chip>
  );
};

export default ChipCuisineComponent;
