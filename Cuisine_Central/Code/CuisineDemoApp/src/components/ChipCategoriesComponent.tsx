import React, {useState} from 'react';
import {Chip} from 'react-native-paper';
import {CategoriesItem} from '../interfaces';
import {ChipStyle} from '../style/BaseStyleSheet';

interface Props {
  categoriesItem: CategoriesItem;
  selectCategory: Function;
  isSelected: boolean;
}
const ChipCategoriesComponent = (props: Props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);

  return (
    <Chip
      style={ChipStyle.chipMainStyle}
      textStyle={ChipStyle.chipTextStyle}
      mode="outlined"
      selected={isSelected}
      accessibilityStates=""
      onPress={() => {
        props.selectCategory(props.categoriesItem.categories.id);
        isSelected ? setIsSelected(false) : setIsSelected(true);
      }}>
      {props.categoriesItem.categories.name}
    </Chip>
  );
};

export default ChipCategoriesComponent;
