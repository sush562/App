import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

export const isNetworkAvailable = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected && response.isInternetReachable;
};

export const displayAlert = (title: string, message?: string) => {
  Alert.alert(title, message);
};

export const displayAlertOkCancelCallback = () => {};

export const displayInternetError = () => {
  displayAlert(
    'Error',
    'No internet available. Please check your connection or try again later.',
  );
};
