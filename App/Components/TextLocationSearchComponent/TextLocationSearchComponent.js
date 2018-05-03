import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import WeatherApi from '../../Services/WeatherApi';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';
import GPSLocationSearchComponent from '../GPSLocationSearchComponent/GPSLocationSearchComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

export default class TextLocationSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      result: null,
      error: null,
      fetching: false,
    };
    this.api = WeatherApi.create();
    this.fetchTimer = null;
  }

  onChangeText = (searchText) => {
    this.makeRemoteRequest(searchText);
  };
  onInputCleared = () => {};

  async makeRemoteRequest(searchText) {
    this.setState({
      ...this.state,
      searchText,
      result: null,
      fetching: true,
      error: null,
    });
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer);
    }
    this.fetchTimer = setTimeout(async () => {
      try {
        let response = await this.api.getSearchResultForString(searchText);
        if (response.ok === true) {
          this.setState({
            ...this.state,
            result: response.data,
            fetching: false,
            error: null,
          });
        } else {
          throw new Error(response.problem);
        }
      } catch (error) {
        this.setState({
          ...this.state,
          result: null,
          fetching: false,
          error,
        });
      }
    }, 500);
  }

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
    return (
      <View>
        <Text h2>Search a city</Text>
        <SearchBar
          lightTheme
          value={this.state.searchText}
          clearIcon={this.state.searchText ? true : null}
          showLoadingIcon={this.state.fetching}
          onChangeText={this.onChangeText}
          onClearText={this.onInputCleared}
          placeholder="Try London or Chennai"
          blurOnSubmit
        />
        {this.state.error ? this.renderFetchErrorMessage() : null}
      </View>
    );
  }
}
