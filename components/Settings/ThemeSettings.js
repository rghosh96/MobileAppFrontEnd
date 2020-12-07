import React, { Component } from 'react';
import { LightThemeModal, DarkThemeModal } from './ThemeModal'
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import Modal from 'react-native-modal';
import { Subtitle, Button, ButtonText } from '../../theming/masterStyle'
import { SubSettingHeader, Title, SettingContainer, ModalContainer, Line } from '../../theming/settingStyle'
 import { MaterialCommunityIcons } from '@expo/vector-icons'



class ThemeSettings extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
  }
  
    state = {
        modalVisible: false,
        modalContent: '',
      };

    setModalVisible = (visible, modalDisplay) => {
      this.setState({ 
        modalVisible: visible,
        modalContent: modalDisplay });
    }

    closeModal() {
      console.log("closing modal")
      this.setState({ 
        modalVisible: !this.state.modalVisible,
        imageSet: false });
    }


    render() {
        const { modalVisible } = this.state;
        // switch statement to determine modal contents
        let modalDisplay;
        switch(this.state.modalContent) {
          case "lightThemes":
            modalDisplay = <LightThemeModal closeModal={this.closeModal} />
            break;

          case "darkThemes":
            modalDisplay = <DarkThemeModal closeModal={this.closeModal} />
            break;

          default: 
            break;
        }

    const noComment = "--"
    return (
        <ThemeProvider theme={ this.props.theme }>
           {console.log(this.props.theme)}
            <SettingContainer>
           
            <SubSettingHeader>
                    <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={31} color={this.props.theme.PRIMARY_COLOR} />
                    <Title>theme settings</Title>
                </SubSettingHeader>
                    <Subtitle>here u can change the app theme!</Subtitle>
                    <Line />
     
                <Button onPress={() => {
                  this.setModalVisible(true, "lightThemes")}}>
                <ButtonText  >light themes</ButtonText>
                </Button>
              
                <Button onPress={() => {
                  this.setModalVisible(true, "darkThemes")}}>
                <ButtonText  >dark themes</ButtonText>
                </Button>
             

          <Modal isVisible={this.state.modalVisible}>
            <ModalContainer>
        
            {modalDisplay}
           
          </ModalContainer>
        </Modal>

       
        </SettingContainer>
                  
        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}


export default connect(mapStateToProps, {pickTheme})(ThemeSettings);






