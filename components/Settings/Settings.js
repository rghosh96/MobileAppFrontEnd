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



class Settings extends Component {


    async resetToken() {
      try {
        await AsyncStorage.setItem("user", null);
     } catch (error) {
       console.log("Something went wrong", error);
     }
     this.props.navigation.navigate("SignUp")
    }

    signOut = () => {
      this.resetToken();
    }


    render() {
    

    const noComment = "--"
    return (
        <ThemeProvider theme={ this.props.theme }>
           {console.log(this.props.theme)}
            <SettingContainer>
      
                    <HeaderText>settings</HeaderText>
                    <Subtitle>here u view ur profile, update your info, change the app theme, etc!</Subtitle>
                    <Line />
          
       
       
                        <Title 
                        onPress={() =>
                          this.props.navigation.navigate('ProfileSettings')}> ⊳ general user info </Title>
                        <Subtitle>view & edit ur profile info</Subtitle>

        <Line /> 
     
                <Title onPress={() =>
                          this.props.navigation.navigate('InterestSettings')}> ⊳ user interests info </Title>
                <Subtitle>view & edit your current interests</Subtitle>
  
        <Line />

         
                <Title onPress={() =>
                          this.props.navigation.navigate('ThemeSettings')}> ⊳ themes </Title>
                <Subtitle>change the app theme!</Subtitle>
      
                <Line />

        <Button style={{justifySelf: 'flex-end'}}onPress={() => { this.signOut() }} >
            <ButtonText>Sign Out</ButtonText>
            </Button> 
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


export default connect(mapStateToProps, {pickTheme})(Settings);






