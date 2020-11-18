import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Text, Button, ButtonText } from '../theming/masterStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Onboarding from 'react-native-onboarding-swiper'
import { Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 300,
      height: 300,
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
        console.log(this.props.theme)
        if (!this.state.loaded) {
          return <AppLoading />
        }
        const primary = this.props.theme.PRIMARY_COLOR;
        const bg = this.props.theme.BG_COLOR;
        const grey = this.props.theme.GREY;
        return (
            <ThemeProvider theme={ this.props.theme }>
                <Onboarding
                    onSkip={() => this.props.navigation.navigate("SignUp")}
                    onDone={() => this.props.navigation.navigate("SignUp")}
                    showNext = {false}
                    showSkip = {false}
                    pages={[
                        {
                            backgroundColor: bg,
                            image: <LottieView style={{height: 200}}source={require('../assets/splash.json')} autoPlay loop />,
                            title: 'welcome',
                            titleStyles: {color: primary, fontFamily: "header"},
                            subTitleStyles: {color: grey, fontFamily: "text"},
                            subtitle: 'a computer science social networking app to help cultivate diversity & bring together everyone',
                        },
                        {
                            backgroundColor: primary,
                            image: <LottieView style={{height: 200}}source={require('../assets/splash2.json')} autoPlay loop />,
                            title: 'expand your horizons',
                            titleStyles: {color: bg, fontFamily: "header"},
                            subTitleStyles: {color: bg, fontFamily: "text"},
                            subtitle: 'get ready to meet and get to know your fellow major mates! all you need is a uark login!',
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




