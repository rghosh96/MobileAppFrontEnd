import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { PeopleImage} from '../theming/dashStyle'

export default class AsyncImage extends Component {
  
    constructor(props) {
      super(props)
      this.state = { loaded: false }
    }
    render() {
      const { 
        source, 
      } = this.props
      return (
          <View style={{margin: 0, padding: 0}}>
          <PeopleImage
            source={source}
            onLoad={this._onLoad} />
          {!this.state.loaded ?
            <LottieView style={{height: 105, position:'absolute'}}source={require('../assets/loading.json')} autoPlay loop /> : null }
        </View>
      )
    }
    _onLoad = () => {
      this.setState(() => ({ loaded: true }))
    }
  }