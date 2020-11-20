import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View
} from "react-native";
import { List } from 'react-native-paper'
import { Container, HeaderContainer, HeaderText, Button, ButtonText } from '../theming/masterStyle'
import { SettingContainer, ListItem, ModalView, ModalContainer, SelectedTheme, Line, Title,
  ModalOptions} from '../theming/settingStyle'


  

class Settings extends Component {
    state = {
        expanded: true,
        modalVisible: false,
        displayOptions: ""
      };

      handlePress = () => {
        this.setState({
          expanded: !this.state.expanded
        })
      }

      setModalVisible = (visible, themeOptions) => {
        this.setState({ 
          modalVisible: visible,
          displayOptions: themeOptions });
      }


    render() {
        console.log(this.props.theme)
        const { modalVisible } = this.state;
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>settings</HeaderText>
                </HeaderContainer>
                <SettingContainer>

                <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <ModalContainer>
              {this.state.displayOptions === "lightTheme" ? 
              <ModalView>
                <Title>Light Themes</Title>
                {this.props.theme.mode === "olive" ? <SelectedTheme onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</SelectedTheme> : 
                  <ModalOptions onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</ModalOptions>}
                {this.props.theme.mode === "lavender" ? <SelectedTheme onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</SelectedTheme> : 
                  <ModalOptions onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</ModalOptions>}
                <Button onPress={() => { this.setModalVisible(!modalVisible); }} >
                  <ButtonText>Done</ButtonText>
                </Button>
              </ModalView>
                 :
              <ModalView>
                <Title>Dark Themes</Title>
                {this.props.theme.mode === "pink" ? <SelectedTheme onPress={() => this.props.pickTheme(pinkTheme)}>Pink Theme</SelectedTheme> : 
                  <ModalOptions onPress={() => this.props.pickTheme(pinkTheme)}>Pink Theme</ModalOptions>}
                <Button onPress={() => { this.setModalVisible(!modalVisible); }} >
                  <ButtonText>Done</ButtonText>
                </Button>
              </ModalView>
              }

              
            </ModalContainer>
        </Modal>

          <List.Section style={{padding: 5, alignSelf: "stretch" }}>
      <List.Accordion
        title="Theme Options"
        titleStyle={ {color: this.props.theme.GREY, fontFamily: "text", fontSize: 19}}
        theme={{ colors: { primary: this.props.theme.PRIMARY_COLOR }}}
        left={props => <List.Icon {...props} icon="format-paint" color={this.props.theme.GREY}/>}>
        <ListItem onPress={() => {
            this.setModalVisible(true, "lightTheme");
          }}> ⊳ Light Themes</ListItem>
        <ListItem onPress={() => {
            this.setModalVisible(true, "darkTheme");
          }}> ⊳ Dark Themes</ListItem>
      </List.Accordion>
      <Line />

      <List.Accordion
        title="Account Details"
        titleStyle={ {color: this.props.theme.GREY, fontFamily: "text", fontSize: 19}}
        theme={{ colors: { primary: this.props.theme.PRIMARY_COLOR }}}
        left={props => <List.Icon {...props} icon="account-edit" color={this.props.theme.GREY}/>}>
        <ListItem onPress={() => {
            this.setModalVisible(true);
          }}> ⊳ Edit Details </ListItem>
      </List.Accordion>
      <Line />

    </List.Section>
                    
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default connect(mapStateToProps, {pickTheme})(Settings);






