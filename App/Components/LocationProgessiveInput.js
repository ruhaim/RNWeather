import React, { Component } from 'react';
import ProgressiveInput from './ProgressiveInput';

export default class LocationProgessiveInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isLoading: false,
    };
  }

  _onChangeText(text) {
    this.setState({ isLoading: true, value: text });

    fetch(`https://www.metaweather.com/api/location/search/?query=${text}`).then((result) => {
      // Process list of suggestions

      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <ProgressiveInput
        value={this.state.value}
        isLoading={this.state.isLoading}
        onChangeText={(event) => {
          this._onChangeText(event);
        }}
      />
    );
  }
}
