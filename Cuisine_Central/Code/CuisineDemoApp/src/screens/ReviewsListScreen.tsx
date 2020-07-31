import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fetchReviewsList} from '../service/ReviewsService';
import {Avatar, Card, Title, Appbar, Paragraph} from 'react-native-paper';
import {ReviewListParameter, ReviewItem} from '../interfaces';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {BallIndicator} from 'react-native-indicators';
import {
  baseStyle,
  ReviewListStyle,
  containerStyle,
} from '../style/BaseStyleSheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../utils/Colors';
import {WEB_SCREEN_NAME} from '../utils/Data';
import {isNetworkAvailable, displayInternetError} from '../utils/Util';

interface State {
  isFetchingReviewList: boolean;
  isFetchingMoreReviewList: boolean;
  isMoreAvailable: boolean;
  start: number;
  reviewList: ReviewItem[];
}
interface Props {
  route: any;
  navigation: any;
}

class ReviewsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFetchingReviewList: false,
      isFetchingMoreReviewList: false,
      isMoreAvailable: true,
      start: 0,
      reviewList: [],
    };
    this.fetchReviews = this.fetchReviews.bind(this);
    this.renderFooterComponent = this.renderFooterComponent.bind(this);
  }

  async componentDidMount() {
    this.setState({isFetchingReviewList: true});
    const isConnected: boolean | undefined | null = await isNetworkAvailable();
    if (isConnected) {
      this.fetchReviews();
    } else {
      this.setState({
        isFetchingReviewList: false,
        isFetchingMoreReviewList: false,
        isMoreAvailable: false,
      });
      displayInternetError();
    }
  }

  delayCall: any = null;

  renderItemView = (item: ReviewItem) => {
    return (
      <Card accessibilityStates="" style={ReviewListStyle.cardMainStyle}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() =>
            this.props.navigation.navigate(WEB_SCREEN_NAME, {
              url: item.review.user.profile_url,
            })
          }>
          <View
            style={[
              ReviewListStyle.cardImageViewStyle,
              {
                backgroundColor: '#' + item.review.user.foodie_color,
              },
            ]}>
            <Avatar.Image
              style={{elevation: 20}}
              accessibilityStates=""
              size={80}
              source={{uri: item.review.user.profile_image}}
            />
            <Text style={ReviewListStyle.cardNameStyle}>
              {item.review.user.name}
            </Text>
          </View>
        </TouchableOpacity>
        <Card.Content>
          <View style={ReviewListStyle.cardContentStyle}>
            <Title style={ReviewListStyle.cardContentTitleStyle}>
              {item.review.rating_text}
            </Title>
            {this.getStars(item.review.rating, item.review.rating_color)}
          </View>
          {item.review.review_text ? (
            <Paragraph style={baseStyle.textBaseStyle}>
              {item.review.review_text}
            </Paragraph>
          ) : null}
        </Card.Content>
      </Card>
    );
  };

  getStars(ratingCount: number, ratingColor: string) {
    const list = [];
    for (var i = 0; i < ratingCount; i++) {
      list.push(<Icon name="star" size={15} color={`#` + ratingColor} />);
    }
    return list;
  }

  async fetchReviews() {
    if (this.state.isMoreAvailable) {
      if (!this.state.isFetchingReviewList) {
        this.setState({isFetchingMoreReviewList: true});
      }
      this.delayCall = setTimeout(() => {
        const id = this.props.route.params.restaurantId;
        let params: ReviewListParameter = {
          restaurantId: this.props.route.params.restaurantId,
          start: this.state.start,
          count: 10,
        };
        fetchReviewsList(params)
          .then((val) => {
            this.setState({
              reviewList: [...this.state.reviewList, ...val.user_reviews],
              isFetchingReviewList: false,
              isFetchingMoreReviewList: false,
              isMoreAvailable: this.state.start < 10 ? true : false,
              start: this.state.start < 10 ? this.state.start + 1 : 10,
            });
          })
          .catch((e) => {
            this.setState({
              isFetchingReviewList: false,
              isFetchingMoreReviewList: false,
            });
          });
      }, 2000);
    }
  }

  renderFooterComponent() {
    if (this.state.isMoreAvailable) {
      return (
        <View style={ReviewListStyle.footerViewStyle}>
          <BallIndicator color={Colors.primary} />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <SafeAreaView style={containerStyle.container}>
        <View style={baseStyle.baseParentViewStyle}>
          <Appbar.Header
            accessibilityStates=""
            style={baseStyle.toolbarBaseStyle}>
            <Appbar.BackAction
              accessibilityStates=""
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <Appbar.Content
              accessibilityStates=""
              title="Reviews"
              titleStyle={baseStyle.textBaseStyle}
            />
          </Appbar.Header>
          {this.state.isFetchingReviewList && (
            <BallIndicator color={Colors.primary} />
          )}
          {!this.state.isFetchingReviewList && (
            <FlatList
              style={ReviewListStyle.reviewListStyle}
              data={this.state.reviewList}
              renderItem={({item}) => this.renderItemView(item)}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.fetchReviews}
              onEndReachedThreshold={0.2}
              ListFooterComponent={this.renderFooterComponent}
              maxToRenderPerBatch={100}
              removeClippedSubviews={true}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default ReviewsList;
