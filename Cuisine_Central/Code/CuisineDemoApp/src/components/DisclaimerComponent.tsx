import * as React from 'react';
import {View} from 'react-native';
import {Menu, Provider, Appbar} from 'react-native-paper';

const DisclaimerComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={{right: 0}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              accessibilityStates=""
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
        </Menu>
      </View>
    </Provider>
  );
};

export default DisclaimerComponent;
