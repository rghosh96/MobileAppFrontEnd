import React from 'react';
import { Center } from './theming/masterStyle'
import LottieView from 'lottie-react-native';

export default function Loader() {
  return (
    <Center>
        <LottieView style={{height: 200}}source={require('./assets/splash.json')} autoPlay loop />
    </Center>
  )}



