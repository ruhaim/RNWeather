import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import WeatherApi from '../../Services/WeatherApi';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';
import GPSLocationSearchComponent from '../GPSLocationSearchComponent/GPSLocationSearchComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';
import TextLocationSearchComponent from '../TextLocationSearchComponent/TextLocationSearchComponent';

export default class LocationSearchComponent extends Component {
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

  renderRow = (item, searchText) => (
    <ListItem
      title={
        <Highlighter
          style={{ paddingLeft: 5 }}
          highlightStyle={{ fontWeight: 'bold' }}
          searchWords={[searchText]}
          textToHighlight={item.item.title}
        />
      }
      avatar={<Icon name="md-pin" size={25} />}
    />
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
        <TextLocationSearchComponent api={this.api} />
        <GPSLocationSearchComponent
          api={this.api}
          style={{
            borderTopWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: 'transparent',
          }}
        />
        <List
          containerStyle={{
            borderTopWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            data={this.state.result}
            renderItem={item => this.renderRow(item, this.state.searchText)}
            keyExtractor={item => String(item.woeid)}
          />
        </List>
      </View>
    );
  }
}
