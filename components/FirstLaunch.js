import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Text } from '../theming/masterStyle'
import { Button, ButtonText} from '../theming/settingsStyle'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Onboarding from 'react-native-onboarding-swiper'
import { Image, StyleSheet } from 'react-native';
import { Navigation } from '../Navigation';

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

class FirstLaunch extends Component {
    state = {
        loaded: false,
      }
      // load fonts
      async componentDidMount() {
        try {
          await Font.loadAsync({
            header: require('../assets/fonts/ArchivoBlack-Regular.ttf'),
            text: require('../assets/fonts/Spartan-Medium.ttf')
        })
        this.setState({ loaded: true })
        } catch(e){
          console.log("error loading fonts")
        }
      }
      render() {
        console.log(this.state)
        if (!this.state.loaded) {
          return <AppLoading />
        }
    return (
        <ThemeProvider theme={ this.props.theme }>
            <Onboarding
                onSkip={() => this.props.navigation.navigate("SignUp")}
                onDone={() => this.props.navigation.navigate("SignUp")}
                pages={[
                    {
                    backgroundColor: '#fff',
                    image: <Image style={styles.logo} source={require('../mockData/pic1.jpg')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                    backgroundColor: '#fff',
                    image: <Image style={styles.logo} source={require('../mockData/pic1.jpg')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                    },
                ]}
            />
        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(FirstLaunch);




