import React from 'react';
import {View, Image, Text, BackHandler, Alert} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {LocationItem} from '../interfaces';
import LinearGradient from 'react-native-linear-gradient';
import {SplashScreenStyle} from '../style/BaseStyleSheet';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ZOMATO_ICON_URL,
  LOCATION_SCREEN_NAME,
  HOME_SCREEN_NAME,
  DISCLAIMER_SCREEN_NAME,
  IS_DISCLAIMER_READ,
} from '../utils/Data';

const color_list = ['#81ebd7', '#2b9480', '#046b58'];

interface Props {
  navigation: any;
  locationItem: LocationItem;
}

interface State {}

class SplashScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.goToNextPage();
    }, 2000);
  }

  async goToNextPage() {
    if (this.props.locationItem.city_id) {
      this.props.navigation.dispatch(StackActions.replace(HOME_SCREEN_NAME));
    } else {
      try {
        const value = await AsyncStorage.getItem(IS_DISCLAIMER_READ);
        if (value !== null && value === 'true') {
          this.props.navigation.dispatch(
            StackActions.replace(LOCATION_SCREEN_NAME, {isFromHomePage: false}),
          );
        } else {
          this.props.navigation.dispatch(
            StackActions.replace(DISCLAIMER_SCREEN_NAME),
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    return (
      <LinearGradient
        colors={color_list}
        style={SplashScreenStyle.gradientStyle}>
        <Text style={SplashScreenStyle.titleStyle}>Cuisine Central</Text>
        <View style={SplashScreenStyle.footerMainViewStyle}>
          <Text style={SplashScreenStyle.footerTextStyle}>Powered by</Text>
          <View style={SplashScreenStyle.footerImageViewStyle}>
            <Image
              style={SplashScreenStyle.footerImageStyle}
              source={{
                uri: ZOMATO_ICON_URL,
              }}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    locationItem: state.locationReducer,
  };
};

export default connect(mapStateToProps)(SplashScreen);
