import React, { Component } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';

import { Images } from '../Themes';
import ProgressiveInput from '../Components/ProgressiveInput';
import WeatherApi from '../Services/WeatherApi';

import { List, ListItem } from 'react-native-elements';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: WeatherApi.create(),
      searchText: null,
      result: null,
      error: null,
      fetching: false,
    };
    this.fetchTimer = null;
  }

  onChangeText = (searchText) => {
    this.makeRemoteRequest(searchText);
  };
  onInputCleared = () => {};

  async makeRemoteRequest(searchText) {
    this.setState({
      ...this.state,
      result: null,
      fetching: true,
      error: null,
    });
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer);
    }
    this.fetchTimer = setTimeout(async () => {
      let { api } = this.state;
      try {
        let response = await api.getSearchResultForString(searchText);
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
  renderRow = (item) => {
    console.log('dfs');
    return (
      <ListItem>
        title={`${item.item.title}`}
        subtitle={'khgjgh hgf'}
        leftIcon={{ name: 'md-pin' }}
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Type in a name of a City</Text>
        <ProgressiveInput
          style={styles.progressiveInput}
          isLoading={this.state.fetching}
          placeholder="Try London or Chennai"
          onChangeText={this.onChangeText}
          onInputCleared={this.onInputCleared}
        />
        <List>
          <FlatList
            data={this.state.result}
            renderItem={this.renderRow}
            keyExtractor={item => String(item.woeid)}
          />
        </List>
      </View>
    );
  }
}
