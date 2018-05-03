import React, { Component } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';

import { Text, List, ListItem, SearchBar, Button } from 'react-native-elements';
import GPSLocatorButton from './GPSLocatorButton/GPSLocatorButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';

export default class GPSLocationSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
      result: null,
      error: null,
      isFetching: false,
    };
  }

  onLocationReceived = (position) => {
    this.makeRemoteRequest(position);
  };

  async makeRemoteRequest(position) {
    this.setState({
      ...this.state,
      position,
      result: null,
      isFetching: true,
      error: null,
    });

    let { api } = this.props;
    let { latitude, longitude } = position.coords;
    console.log(position);
    try {
      let response = await api.getSearchResultForLattLong(latitude, longitude);
      if (response.ok === true) {
        this.setState({
          ...this.state,
          result: response.data,
          isFetching: false,
          error: null,
        });
      } else {
        throw new Error(response.problem);
      }
    } catch (error) {
      this.setState({
        ...this.state,
        result: null,
        isFetching: false,
        error,
      });
      console.log('error', error);
    }
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
  renderFetchingMessage = () => (
    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
      <ActivityIndicator size="small" />
      <Text>Fetching cities nearby...</Text>
    </View>
  );
  renderFetchErrorMessage = () => (
    <View style={{ alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
      <Icon name="md-alert" type="ionicon" size={20} />
      <Text>Error fetching nearby cities, check your network connection and try again</Text>
    </View>
  );

  render() {
    return (
      <View>
        <GPSLocatorButton onLocationReceived={this.onLocationReceived} />
        <List
          containerStyle={{
            maxHeight: '75%',
            borderTopWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            data={this.state.result}
            renderItem={item => this.renderRow(item, '')}
            keyExtractor={item => String(item.woeid)}
          />
        </List>
        {this.state.isFetching ? this.renderFetchingMessage() : null}
        {this.state.error ? this.renderFetchErrorMessage() : null}
      </View>
    );
  }
}
