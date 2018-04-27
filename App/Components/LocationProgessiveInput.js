import React, { Component } from 'react'
import ProgressiveInput from 'react-native-progressive-input';

export default class LocationProgessiveInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isLoading: false
    };
  }
  
  _onChangeText(text) {
    this.setState({isLoading: true, value: text});
    
    fetch("https://www.metaweather.com/api/location/search/?query="+text)
      .then((result) => {
        // Process list of suggestions
        
        this.setState({isLoading: false});
      });
  }

  render() {
    return (<ProgressiveInput
      value={this.state.value}
      isLoading={this.state.isLoading}
      onChangeText={this._onChangeText.bind(this)}
    />);
  }
}


