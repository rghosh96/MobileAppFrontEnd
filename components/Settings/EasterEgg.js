import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import { HeaderText, Subtitle, Text, Button, ButtonText, CenterSpecial } from '../../theming/masterStyle'
import { SettingContainer, Line, Title, SubSettingHeader  } from '../../theming/settingStyle'
import SpecialImage from '../SpecialImage';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'


class EasterEgg extends Component {
    render() {

    return (
        <ThemeProvider theme={ this.props.theme }>
           {console.log(this.props.theme)}
            <SettingContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
            <SubSettingHeader>
                    <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={49} color={this.props.theme.PRIMARY_COLOR} />
                    <HeaderText>the creaters</HeaderText>
                </SubSettingHeader>
                    
                    <Subtitle>nice! you found our lil easter egg page. here's some info about the creators :)</Subtitle>
                    <Line />
          <CenterSpecial style={{marginBottom: 50}}>
            <SpecialImage/>
            <Line/>
            <Subtitle>we created this app because we came into this major without knowing many people (as a lot are),
                and for a couple of us, we had just taken a leap of faith, switching our majors! we were so blessed to find
                each other and cultivate an ever lasting friendship. we've always felt a bit different from our fellow CSCE
                colleagues, but quickly realized that people like us exist! and there IS a lot of diversity in this major.
                we hope one day in the future, CSCE people aren't recognized as white male gamers, but as all kinds of people. 
                even people like us, who like to describe our code as "cute". (;
            </Subtitle>
            </CenterSpecial>
            
            </ScrollView>
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


export default connect(mapStateToProps, {pickTheme})(EasterEgg);






