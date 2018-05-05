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
import GPSLocationSearchComponent from '../GPSLocationSearchComponent/GPSLocationSearchComponent';

import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

class TextLocationSearchComponent extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      locationSearch: { ...nextProps.locationSearch },
      locationCoordSearch: { ...nextProps.locationCoordSearch },
    };
  }
  constructor(props) {
    super(props);

    this.state = { searchMode: 'text' };
  }

  onChangeText = (searchText) => {
    this.setState({ searchMode: 'text' });
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
      <Text>Error fetching matching entries, check your network connection and try again</Text>
    </View>
  );

  render() {
    let {
      searchText, isFetching, error, result,
    } = this.state.locationSearch;
    if (this.state.searchMode === 'gps') {
      result = this.state.locationCoordSearch.result;
      searchText = '';
    }

    return (
      <View>
        <Text h4>Search for a city</Text>
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
            maxHeight: '70%',
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            data={result}
            ListHeaderComponent={
              <GPSLocationSearchComponent
                onSearchInit={() => {
                  this.setState({ searchMode: 'gps' });
                }}
                style={{
                  borderTopWidth: 0,
                  paddingTop: 0,
                  marginTop: 0,
                  backgroundColor: 'transparent',
                }}
              />
            }
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
  locationCoordSearch: state.locationCoordSearch,
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
