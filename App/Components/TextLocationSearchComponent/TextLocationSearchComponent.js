import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import WeatherApi from '../../Services/WeatherApi';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';
import LocationTextSearchActions from '../../Redux/Actions/LocationTextSearchActions';

import CityWeatherActions from '../../Redux/Actions/CityWeatherActions';

import LocationListItemRenderer from '../LocationSearch/LocationListItemRenderer';

import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

class TextLocationSearchComponent extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      locationSearch: { ...nextProps.locationSearch },
    };
  }
  constructor(props) {
    super(props);

    this.state = {};
  }

  onChangeText = (searchText) => {
    this.props.searchLocationRequest(searchText);
  };
  onInputCleared = () => {};
  renderFetchErrorMessage = () => (
    <View
      style={{
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
      }}
    >
      <Icon name="md-alert" type="ionicon" size={20} />
      <Text>
        Error fetching matching entries, check your network connection and try
        again
      </Text>
    </View>
  );

  render() {
    const {
      searchText, isFetching, error, result,
    } = this.state.locationSearch;
    return (
      <View>
        <Text h2>Search a city</Text>
        <SearchBar
          lightTheme
          value={searchText}
          clearIcon={searchText ? true : null}
          showLoadingIcon={isFetching}
          onChangeText={this.onChangeText}
          onClearText={this.onInputCleared}
          placeholder="Try London or Chennai"
          blurOnSubmit
        />
        {error ? this.renderFetchErrorMessage() : null}
        <List
          containerStyle={{
            borderTopWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            data={result}
            renderItem={item => (
              <LocationListItemRenderer
                item={item}
                searchText={searchText}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => String(item.woeid)}
          />
        </List>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  locationSearch: state.locationSearch,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchLocationRequest: LocationTextSearchActions.searchLocationRequest,
      getWeatherByWoeid: CityWeatherActions.getWeatherByWoeid,
    },

    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TextLocationSearchComponent));
