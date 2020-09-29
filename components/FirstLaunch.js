import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, HeaderText, Text } from '../theming/masterStyle'
import { Button, ButtonText} from '../theming/settingsStyle'


class FirstLaunch extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>first launch</HeaderText>
                </HeaderContainer>
                    
                    <Button onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <ButtonText>go to Dashboard ...</ButtonText>
                    </Button>
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

export default connect(mapStateToProps, {pickTheme})(FirstLaunch);




