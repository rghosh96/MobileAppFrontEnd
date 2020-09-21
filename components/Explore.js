import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Line, Button,
  ButtonText, ProfileInfo, ProfileImage, ImageContainer, Content, Text } from '../theming/dashStyle'


class Explore extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>explore.</HeaderText>
                </HeaderContainer>
                <Line></Line>
                
                <Content>
                    <Text>boop</Text>
                  
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

export default connect(mapStateToProps, {pickTheme})(Explore);




