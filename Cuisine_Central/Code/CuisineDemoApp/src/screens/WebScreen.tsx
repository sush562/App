import React from 'react';
import {WebView} from 'react-native-webview';
import {Platform, BackHandler} from 'react-native';

interface Props {
  route: any;
}
interface State {}

class WebScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    }
  }

  render() {
    const url: string = this.props.route.params.url;
    return (
      <WebView
        ref={(webView) => {
          this.webView.ref = webView;
        }}
        onNavigationStateChange={(navState) => {
          this.webView.canGoBack = navState.canGoBack;
        }}
        automaticallyAdjustContentInsets={false}
        domStorageEnabled={true}
        startInLoadingState={true}
        javaScriptEnabled={true}
        source={{uri: url}}
      />
    );
  }
}

export default WebScreen;
