import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import Settings from './Settings'
import { Container, HeaderContainer, HeaderText, Line, Button,
  ButtonText, ProfileInfo, ProfileImage, ImageContainer, Content } from '../theming/dashStyle'


class Dashboard extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>mobile app</HeaderText>
                </HeaderContainer>
                <Line></Line>
          

                <ImageContainer>
                    <ProfileImage
                        source={require('../rashi.jpeg')}
                    />
                    <ProfileInfo>
                        your name {"\n"}
                        your major {"\n"}
                        your year
                    </ProfileInfo>
                </ImageContainer>
                
                <Content>
                  <Button onPress={() => this.props.navigation.navigate('Settings')}>
                    <ButtonText>go to Settings ...</ButtonText>
                  </Button>
                </Content>
                
            </Container>
        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(Dashboard);




