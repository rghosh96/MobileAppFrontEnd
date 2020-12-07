import React, { Component } from 'react';
import { LightThemeModal, DarkThemeModal } from './ThemeModal'
import { UserInputModal, UserBioInputModal, ProfileImageModal,
  UserDropDownModal } from './InputModals'
import CustomRatings from '../CustomRatings'
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { HeaderText, Subtitle, Text, Button, ButtonText } from '../../theming/masterStyle'
import {CLOUD_NAME, CLOUD_PRESET, CLOUD_BASE_API} from "@env"
import { SettingContainer, ProfileImage, ModalContainer, Line, Title, EditItem, UserAttribute, InfoArea, 
  RatingContainer, ListContainer } from '../../theming/settingStyle'
import { InterestModal } from './InterestModals';



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
           
                    <HeaderText>settings</HeaderText>
                    <Subtitle>here u view ur profile, update your info, change the app theme, etc!</Subtitle>
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






