import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../styles/themes'
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';

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
                        source={require('../flowers.jpeg')}
                    />
                    <ProfileInfo>
                        your name {"\n"}
                        your major {"\n"}
                        your year
                    </ProfileInfo>
                </ImageContainer>
                
                <Content>
                    <Button onPress={() => this.props.pickTheme(pinkTheme)}>
                        <ButtonText>pink theme</ButtonText>
                    </Button>

                    <Button onPress={() => this.props.pickTheme(lavenderTheme)}>
                        <ButtonText>lavender theme</ButtonText>
                    </Button>

                    <Button onPress={() => this.props.pickTheme(oliveTheme)}>
                        <ButtonText>olive theme</ButtonText>
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

const Container = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.BG_COLOR};
    margin: 70px 30px 0px 30px;
    alignItems: flex-start;
    justifyContent: flex-start;
`;

const HeaderContainer = styled.View`
    backgroundColor: ${props => props.theme.BG_COLOR};
`;

const Line = styled.View`
    height: 1px;
    width: 100%;
    margin: 15px 0px 15px 0px;
    backgroundColor: ${props => props.theme.GREY};
`;

const Button = styled.TouchableOpacity`
  padding: 10px;
  borderRadius: 2;
  backgroundColor:${props => props.theme.PRIMARY_COLOR};
  margin: 7px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.BG_COLOR};
`;

const ProfileInfo = styled.Text`
  color: ${props => props.theme.GREY};
  textAlign: left;
  margin: 30px;
  fontSize: 15px;
`;

const HeaderText = styled.Text`
  fontSize: 50;
  color: ${props => props.theme.PRIMARY_COLOR};
  fontWeight: 900;
`;

const ProfileImage = styled.Image`
  height: 125px;
  width: 125px;
  borderRadius: 75px;
  textAlign: center;
`;

const ImageContainer = styled.View`
  flex: .2;
  margin: 15px;
  width: 100%;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`;

const Content = styled.View`
  flex: .2;
  width: 100%;
  justifyContent: center;
  alignItems: center;
`;


