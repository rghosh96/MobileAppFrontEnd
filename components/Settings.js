import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { List } from 'react-native-paper'
import { Container, HeaderContainer, HeaderText, Text, Button, ButtonText } from '../theming/masterStyle'
import { SettingContainer, ItemTitle, Line } from '../theming/settingStyle'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



class Settings extends Component {
    state = {
        expanded: false
    }

    expand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }


    render() {
        console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>settings</HeaderText>
                </HeaderContainer>
                <SettingContainer>
                

                <Collapse>
                    <CollapseHeader>
                    <MaterialCommunityIcons name="border-color" color={this.props.theme.PRIMARY_COLOR} size={21}>
                        <ItemTitle>change theme</ItemTitle>
                    </MaterialCommunityIcons>
                    </CollapseHeader>
                    <CollapseBody>
                    <Text onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</Text>
                    <Text onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</Text>
                    <Text onPress={() => this.props.pickTheme(pinkTheme)}>Pink Theme</Text>
                    </CollapseBody>
                </Collapse>
                <Line/>
                <Collapse>
                    <CollapseHeader>
                    <MaterialCommunityIcons name="account" color={this.props.theme.PRIMARY_COLOR} size={21}>
                        <ItemTitle>edit profile</ItemTitle>
                    </MaterialCommunityIcons>
                    </CollapseHeader>
                    <CollapseBody>
                    <Text>boop</Text>
                    </CollapseBody>
                </Collapse>
                <Line/>

                <AccordionList
                        list={this.state.list}
                        header={this._head}
                        body={this._body}
                        keyExtractor={item => item.key}
                    />

    <Button onPress={() => this.props.navigation.navigate('SignUp')}>
                        <ButtonText>go to SignUp ...</ButtonText>
                    </Button>
                    
                    </SettingContainer>
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






