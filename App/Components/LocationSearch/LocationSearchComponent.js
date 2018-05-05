import React, { Component } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WeatherApi from '../../Services/WeatherApi';

import { Text, List, ListItem, Avatar } from 'react-native-elements';
import GPSLocationSearchComponent from '../GPSLocationSearchComponent/GPSLocationSearchComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlighter from 'react-native-highlight-words';
import TextLocationSearchComponent from '../TextLocationSearchComponent/TextLocationSearchComponent';
import AppHeader from '../AppHeader/AppHeader';

class LocationSearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      result: null,
      error: null,
      fetching: false,
    };
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <AppHeader />
        <TextLocationSearchComponent />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchComponent);
