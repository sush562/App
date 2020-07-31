import {StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';

export const baseStyle = StyleSheet.create({
  toolbarBaseStyle: {
    height: 55,
    backgroundColor: 'transparent',
  },
  textBaseStyle: {
    fontFamily: 'FallingSky',
  },
  textFontBold: {
    fontFamily: 'FallingSkyBold',
  },
  baseParentViewStyle: {
    flex: 1,
  },
});

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export const screenMiddleStyle = StyleSheet.create({
  middleStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const FilterScreenStyle = StyleSheet.create({
  scroll: {
    flex: 1,
    height: '100%',
  },
  categoryStyle: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginEnd: 10,
  },
  filterButtonStyle: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
  },
  indicatorStyle: {
    ...screenMiddleStyle.middleStyle,
  },
  filterTitleStyle: {
    ...baseStyle.textFontBold,
    marginStart: 10,
    fontSize: 18,
    marginTop: 10,
  },
  filterSliderStyle: {
    marginStart: 10,
    marginTop: 10,
    marginEnd: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  radiusTextStyle: {
    ...baseStyle.textFontBold,
    fontSize: 18,
  },
});

export const DisclaimerScreenStyle = StyleSheet.create({
  mainTextStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 15,
  },
  zomatoLogoStyle: {
    height: 70,
    width: 70,
    resizeMode: 'stretch',
  },
  logoMakrStyle: {
    height: 50,
    width: 150,
    resizeMode: 'stretch',
  },
  creditsStyle: {
    ...baseStyle.textFontBold,
    fontSize: 18,
  },
  mainViewStyle: {
    marginStart: 10,
    marginEnd: 10,
  },
});

export const HomeScreenStyle = StyleSheet.create({
  cardMainStyle: {
    flex: 1,
    margin: 10,
  },
  cardContentStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 20,
  },
  ratingMainViewStyle: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  ratingInnerViewStyle: {
    width: 'auto',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginEnd: 10,
    borderRadius: 10,
  },
  ratingTextStyle: {
    color: Colors.white,
    margin: 5,
    alignSelf: 'center',
  },
  cardCoverStyle: {
    resizeMode: 'stretch',
  },
  footerLoaderStyle: {
    flex: 1,
    height: 100,
    width: '100%',
  },
});

export const LocationScreenStyle = StyleSheet.create({
  searchBarStyle: {
    ...baseStyle.textBaseStyle,
    marginStart: 10,
    marginEnd: 10,
  },
  itemViewStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 18,
  },
});

export const MapScreenStyle = StyleSheet.create({
  map: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
});

export const RestaurantDetailStyle = StyleSheet.create({
  mainScrollStyle: {
    marginBottom: 70,
  },
  cardImageStyle: {
    resizeMode: 'stretch',
    width: '100%',
    height: 300,
  },
  titleStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 25,
    margin: 10,
  },
  cuisineListStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginEnd: 10,
    marginStart: 10,
  },
  ratingStartStyle: {
    marginStart: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  aggregateRatingStyle: {
    ...baseStyle.textBaseStyle,
    alignSelf: 'center',
    marginStart: 5,
  },
  votesTextStyle: {
    ...baseStyle.textBaseStyle,
    alignSelf: 'center',
    marginStart: 5,
  },
  defaultSurfaceStyle: {
    borderRadius: 10,
    elevation: 4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightSurfaceStyle: {
    padding: 8,
    height: 30,
    marginEnd: 5,
    marginTop: 5,
  },
  highlightStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  highlightIconStyle: {
    ...baseStyle.textBaseStyle,
    marginStart: 5,
    fontSize: 15,
  },
  highlightIconMainStyle: {
    flexDirection: 'row',
    flex: 1,
  },
});

export const ReviewListStyle = StyleSheet.create({
  cardImageViewStyle: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNameStyle: {
    ...baseStyle.textBaseStyle,
    marginTop: 5,
    fontSize: 20,
  },
  cardMainStyle: {
    flex: 1,
    margin: 10,
    elevation: 10,
  },
  cardContentStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentTitleStyle: {
    ...baseStyle.textBaseStyle,
    marginEnd: 10,
  },
  footerViewStyle: {
    flex: 1,
    height: 100,
    width: '100%',
  },
  reviewListStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export const SplashScreenStyle = StyleSheet.create({
  gradientStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: 'FallingSkyOblique',
    fontSize: 40,
    color: Colors.white,
  },
  footerMainViewStyle: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  footerTextStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 15,
    color: Colors.white,
  },
  footerImageViewStyle: {
    marginEnd: 10,
    marginStart: 10,
    height: 55,
    width: 55,
    overflow: 'hidden',
  },
  footerImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export const ChipStyle = StyleSheet.create({
  chipMainStyle: {
    marginStart: 10,
    marginTop: 5,
  },
  chipTextStyle: {
    ...baseStyle.textBaseStyle,
    fontSize: 17,
  },
});
