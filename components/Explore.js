import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Text } from '../theming/masterStyle'


class Explore extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>explore.</HeaderText>
                </HeaderContainer>
                <Text>boop</Text>
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




