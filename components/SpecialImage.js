import React, { Component } from 'react';
import { View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { PeopleImage, ProfileImage } from '../theming/dashStyle'


export default class SpecialImage extends Component {
  
    constructor(props) {
      super(props)
      this.state = { loaded: false }
    }
    render() {
      const { 
        source, type
      } = this.props
      return (
          <View style={{margin: 0, padding: 0}}>

          <Image style={{height: 500, width: 350, borderRadius: 30}}source={require('../assets/creators.jpeg')}  
          onLoad={this._onLoad} />
          
          {!this.state.loaded ?
            <LottieView style={{height: 200, position:'absolute'}}source={require('../assets/loading.json')} autoPlay loop /> : null }
        </View>
      )
    }
    _onLoad = () => {
      this.setState(() => ({ loaded: true }))
    }
  }