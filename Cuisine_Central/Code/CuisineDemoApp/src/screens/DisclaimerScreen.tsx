import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {baseStyle, DisclaimerScreenStyle} from '../style/BaseStyleSheet';
import {
  ZOMATO_ICON_URL,
  LOGOMAKR_ICON_URL,
  LOCATION_SCREEN_NAME,
  ZOMATO_LINK,
  LOGOMAKR_LINK,
  IS_DISCLAIMER_READ,
} from '../utils/Data';

interface Props {
  navigation: any;
}

const DisclaimerScreen = (props: Props) => {
  return (
    <View style={baseStyle.baseParentViewStyle}>
      <Appbar.Header accessibilityStates="" style={baseStyle.toolbarBaseStyle}>
        <Appbar.Content
          titleStyle={baseStyle.textBaseStyle}
          accessibilityStates=""
          title="Disclaimer"
        />
        <Appbar.Action
          accessibilityStates=""
          icon="check"
          onPress={async () => {
            try {
              await AsyncStorage.setItem(IS_DISCLAIMER_READ, 'true');
            } catch (e) {
              console.log(e);
            }
            props.navigation.dispatch(
              StackActions.replace(LOCATION_SCREEN_NAME, {
                isFromHomePage: false,
              }),
            );
          }}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={DisclaimerScreenStyle.mainViewStyle}>
          <Text style={DisclaimerScreenStyle.mainTextStyle}>
            This is a restaurant search mobile application and is purely a
            demonstration app, intended by the developer to demonstrate his
            skills in React Native technology. It is not a full-fledged mobile
            application and has limited functionalities and features.
            {'\n'}
          </Text>
          <Text style={DisclaimerScreenStyle.creditsStyle}>
            Acknowledgments and Credits:{'\n'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(ZOMATO_LINK);
            }}>
            <Image
              source={{
                uri: ZOMATO_ICON_URL,
              }}
              style={DisclaimerScreenStyle.zomatoLogoStyle}
            />
          </TouchableOpacity>
          <Text style={DisclaimerScreenStyle.mainTextStyle}>
            {'\n'}
            This mobile app uses the free APIs provided by Zomato Pvt Ltd (
            {ZOMATO_LINK}). The developer is grateful to them for that and
            acknowledges their resources i.e. APIs that have helped in
            development of this app.
            {'\n'}
            {'\n'}
            As per API guidelines of Zomato, only a limited number of calls are
            allowed in this application. Due to this, the application may
            unexpectedly stop responding to API calls. Please bear in mind this
            is simply a demonstration mobile app, not a full-fledged one.
            {'\n'}
            {'\n'}
            As per Zomato’s data and privacy guidelines, following points are
            complied to:
            {'\n'}
            {'\n'}
            1. No data fetched from Zomato APIs are stored or cached otherwise
            in mobile application.{'\n'}
            2. No data fetched from Zomato APIs are sent to any third party from
            this application.{'\n'}
            3. No statistics or metrics are generated using Zomato licensed data
            in this application.{'\n'}
            4. No licensed data of Zomato is used to generate any kind of
            additional data whatsoever from this application. {'\n'}
            5. Licensed data provided by Zomato API has not been abused or sold
            otherwise from this application.{'\n'}
            6. No enhancements has been done to Zomato licensed data, other than
            visual screens that best suited to be displayed, depending on data
            provided by Zomato API.{'\n'}
            7. No Zomato licensed data has been displayed in application along
            with any third party data, nor anything is displayed in application
            that would be unlawful, blasphemous, derogatory, objectionable,
            against public policy and derogatory or detrimental to Zomato’s
            reputation.
            {'\n'}
            8. To the best of the ability of developer, the has tried to follow
            guidelines of Zomato to display trademark of Zomato in application,
            by showing “Powered by “ with Zomato logo as acknowledgment.
            {'\n'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(LOGOMAKR_LINK);
            }}>
            <Image
              source={{
                uri: LOGOMAKR_ICON_URL,
              }}
              style={DisclaimerScreenStyle.logoMakrStyle}
            />
          </TouchableOpacity>
          <Text style={DisclaimerScreenStyle.mainTextStyle}>
            {'\n'}
            The second entity the developer would acknowledge is LogoMakr (
            {LOGOMAKR_LINK}). The developer used its resources to create an
            appropriate free icon logo for this application.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DisclaimerScreen;
