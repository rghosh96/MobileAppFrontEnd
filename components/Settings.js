import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import Dashboard from './Dashboard'
import { Container, HeaderContainer, HeaderText, Text } from '../theming/masterStyle'
import { Button, ButtonText} from '../theming/settingsStyle'


class Settings extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>settings</HeaderText>
                </HeaderContainer>
                <Text>pick a color theme!</Text>
                    <Button onPress={() => this.props.pickTheme(pinkTheme)}>
                        <ButtonText>pink theme</ButtonText>
                    </Button>

                    <Button onPress={() => this.props.pickTheme(lavenderTheme)}>
                        <ButtonText>lavender theme</ButtonText>
                    </Button>

                    <Button onPress={() => this.props.pickTheme(oliveTheme)}>
                        <ButtonText>olive theme</ButtonText>
                    </Button>
                    
                    <Button onPress={() => this.props.navigation.navigate('SignUp')}>
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

export default connect(mapStateToProps, {pickTheme})(Settings);




