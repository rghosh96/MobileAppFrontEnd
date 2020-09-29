import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Text } from '../theming/masterStyle'
import { Button, ButtonText} from '../theming/settingsStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Onboarding from 'react-native-onboarding-swiper'
import { Image, StyleSheet } from 'react-native';

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
                    pages={[
                        {
                            backgroundColor: bg,
                            image: <Image style={styles.logo} source={require('../mockData/pic1.jpg')} />,
                            title: 'Welcome!',
                            titleStyles: {color: primary, fontFamily: "header"},
                            subTitleStyles: {color: grey, fontFamily: "text"},
                            subtitle: 'Welcome to this lovely app!',
                        },
                        {
                            backgroundColor: primary,
                            image: <Image style={styles.logo} source={require('../mockData/pic1.jpg')} />,
                            title: 'Welcome!',
                            titleStyles: {color: bg, fontFamily: "header"},
                            subTitleStyles: {color: bg, fontFamily: "text"},
                            subtitle: 'Welcome to this lovely app!',
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




