import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from './src/screens/SplashScreen';
import Home from './src/screens/HomeScreen';
import LocationPage from './src/screens/LocationScreen';
import RestaurantDetail from './src/screens/RestaurantDetailScreen';
import MapsScreen from './src/screens/MapsScreen';
import ReviewsList from './src/screens/ReviewsListScreen';
import WebScreen from './src/screens/WebScreen';
import FilterScreen from './src/screens/FilterScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import * as Data from './src/utils/Data';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Data.SPLASH_SCREEN_NAME}
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.LOCATION_SCREEN_NAME}
              component={LocationPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.HOME_SCREEN_NAME}
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.RESTAURANT_DETAIL_SCREEN_NAME}
              component={RestaurantDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.MAPS_SCREEN_NAME}
              component={MapsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.REVIEWS_LIST_SCREEN_NAME}
              component={ReviewsList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.WEB_SCREEN_NAME}
              component={WebScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.FILTER_SCREEN_NAME}
              component={FilterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Data.DISCLAIMER_SCREEN_NAME}
              component={DisclaimerScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
