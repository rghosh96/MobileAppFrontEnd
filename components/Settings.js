import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import {
    Switch,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
import { List } from 'react-native-paper'
import { Container, HeaderContainer, HeaderText, Text, Button, ButtonText } from '../theming/masterStyle'
import { SettingContainer, ItemTitle, Line } from '../theming/settingStyle'


  

class Settings extends Component {
    state = {
        expanded: true
      };

      handlePress = () => {
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

          <List.Section style={styles.header}>
      <List.Accordion
        title="Theme Options"
        theme={{ colors: { primary: this.props.theme.PRIMARY_COLOR }}}
        left={props => <List.Icon {...props} icon="format-paint" />}>
        <Text onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</Text>
        <Text onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</Text>
        <Text onPress={() => this.props.pickTheme(pinkTheme)}>Pink Theme</Text>
      </List.Accordion>

      <List.Accordion
        title="Account Details"
        theme={{ colors: { primary: this.props.theme.PRIMARY_COLOR }}}
        left={props => <List.Icon {...props} icon="account-edit" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      paddingTop: 55,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      padding: 10,
      alignSelf: "stretch",
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
    },
  });






