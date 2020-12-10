import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import { HeaderText, Subtitle, Text, Button, ButtonText } from '../../theming/masterStyle'
import { SettingContainer, Line, Title  } from '../../theming/settingStyle'



class Settings extends Component {


    async resetToken() {
      try {
        await AsyncStorage.removeItem("user");
     } catch (error) {
       console.log("Something went wrong", error);
     }
     this.props.navigation.push("SignUp")
    }

    signOut = () => {
      this.resetToken();
    }


    render() {
    

    const noComment = "--"
    return (
        <ThemeProvider theme={ this.props.theme }>
           {console.log(this.props.theme)}
            <SettingContainer >
          
                    <HeaderText onPress={() =>
                          this.props.navigation.navigate('EasterEgg')}>settings</HeaderText>
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






