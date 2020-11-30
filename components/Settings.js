import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../theming/themes'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { HeaderContainer, HeaderText, Button, ButtonText, Subtitle, Text } from '../theming/masterStyle'
import { SettingContainer, ProfileImage, ModalView, ModalContainer, SelectedTheme, Line, Title,
  ModalOptions, EditItem, UserAttribute, InfoArea, ListContainer, FormInput, BioInput } from '../theming/settingStyle'

class Settings extends Component {
  
    state = {
        modalVisible: false,
        user: '',
        userData: '',
        modalContent: '',
        fName: '',
        lName: '',
        gender: '',
        classification: '',
        grad: '',
        hometown: '',
        major: '',
        bio: '',
        profilePic: ''
      };


      getUserData(user) {
        console.log("in get user data")
        var data;
        let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getUser?USER_id=" + user;
        console.log(apiEndpoint)
        // call api endpoint, sending in user to add to db
        fetch(apiEndpoint,)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                data = JSON.parse(json)
                if (data.isError === false) {
                  console.log("we got user data!")
                  this.setState({userLoaded: true})
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
              if (this.state.userLoaded === true) {
                console.log("we got set the data!")
                let userInfo = data.result[0]
                this.setState({ 
                  fName: userInfo.userFNAME,
                  lName: userInfo.userLNAME,
                  gender: userInfo.userGENDER,
                  classification: userInfo.userGRADE_LEVEL,
                  grad: userInfo.userGRAD_DATE,
                  hometown: userInfo.userHOMETOWN,
                  major: userInfo.userMAJOR,
                  bio: userInfo.userABOUT,
                  profilePic: userInfo.userPROFILEPIC,
                  userData: data.result[0] })
              }
                // if successful addition to db, navigate to create profile
                console.log("finally block") 
            })
      }
    
    async getToken(user) {
      try {
          console.log("before getting item");
        let userId = await AsyncStorage.getItem("user");
        this.setState({user: userId})
        this.getUserData(this.state.user)
        if (userId !== null) {
          let firstLaunch = await AsyncStorage.getItem("alreadyLaunched")
          console.log(firstLaunch)
          this.setState({isFirstLaunch: firstLaunch})
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    async componentDidMount() {
      this.getToken()
    }

    updateUserDB = () => {
      console.log("updating user ...")
      const updatedUser={
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
              userID: this.state.user, 
              values: {
                  userFNAME: this.state.fName,
                  userLNAME: this.state.lName,
                  userHOMETOWN: this.state.hometown,
                  userMAJOR: this.state.major,
                  userGRAD_DATE: this.state.grad,
                  userGRADE_LEVEL: this.state.classification,
                  userABOUT: this.state.bio,
                  userGENDER: this.state.gender,
                  // userPROFILEPIC: this.state.cloudinaryURL
              }
          })
      }
      console.log(updatedUser)
      
      // call api endpoint, sending in user to add to db
      fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/users/updateUser`, updatedUser)
          .then((response) => response.text())
          .then((json) => {
              // parse the response & extract data
              let data = JSON.parse(json)
              console.log("RETURNED DATA")
              console.log(data)
              if (data.isError === false) {
                  this.setState({success: true})
              } else {
                  this.setState({success: false})
              }
              
          })
          .catch((error) => console.error(error))
          .finally(() => {
              console.log("successfully updated")
              console.log(this.state)
              this.getUserData(this.state.user)
              this.setState({modalVisible: !this.state.modalVisible}); 
          })
  }

    setModalVisible = (visible, modalDisplay) => {
      this.setState({ 
        modalVisible: visible,
        modalContent: modalDisplay });
    }

    closeModal() {
      console.log("closing modal")
      this.setState({ 
        modalVisible: !this.state.modalVisible });
    }


    render() {
        const { modalVisible } = this.state;

        // switch statement to determine modal contents
        let modalDisplay;
        switch(this.state.modalContent) {
          case "lightThemes":
            modalDisplay = <ModalView>
              <Title>Light Themes</Title>
                  {this.props.theme.mode === "olive" ? <SelectedTheme onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</SelectedTheme> : 
                    <ModalOptions onPress={() => this.props.pickTheme(oliveTheme)}>Olive Theme</ModalOptions>}
                  {this.props.theme.mode === "lavender" ? <SelectedTheme onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</SelectedTheme> : 
                    <ModalOptions onPress={() => this.props.pickTheme(lavenderTheme)}>Lavender Theme</ModalOptions>}
                
                  <Button onPress={() => { this.closeModal() }} >
                    <ButtonText>Done</ButtonText>
                  </Button>
            </ModalView>
            break;

          case "darkThemes":
            modalDisplay = <ModalView>
                <Title>Dark Themes</Title>
                {this.props.theme.mode === "pink" ? <SelectedTheme onPress={() => this.props.pickTheme(pinkTheme)}>Salmon Theme</SelectedTheme> : 
                  <ModalOptions onPress={() => this.props.pickTheme(pinkTheme)}>Salmon Theme</ModalOptions>}
                
                  <Button onPress={() => { this.closeModal() }} >
                    <ButtonText>Done</ButtonText>
                  </Button>
            </ModalView>
            break;

          case "updateName":
            modalDisplay = <ModalView>
                <Title>update name</Title>
                <FormInput 
                    placeholder='first name' 
                    placeholderTextColor={this.props.theme.LIGHT_GREY}
                    onChangeText={(fName) => this.setState({fName})}
                />
                <FormInput 
                    placeholder='last name' 
                    placeholderTextColor={this.props.theme.LIGHT_GREY}
                    onChangeText={(lName) => this.setState({lName})}
                />
                  <Button onPress={() => { this.updateUserDB(); }} >
                    <ButtonText>Done</ButtonText>
                  </Button>
                  <Button onPress={() => { this.closeModal() }} >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
            </ModalView>
            break;

            case "updateGender":
              modalDisplay = <ModalView>
                  <Title>update gender</Title>
                  <FormInput 
                      placeholder='gender' 
                      placeholderTextColor={this.props.theme.LIGHT_GREY}
                      onChangeText={(gender) => this.setState({gender})}
                  />
                    <Button onPress={() => { this.updateUserDB(); }} >
                      <ButtonText>Done</ButtonText>
                    </Button>
                    <Button onPress={() => { this.closeModal() }} >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
              </ModalView>
              break;

            case "updateHometown":
              modalDisplay = <ModalView>
                  <Title>update gender</Title>
                  <FormInput 
                      placeholder='hometown' 
                      placeholderTextColor={this.props.theme.LIGHT_GREY}
                      onChangeText={(hometown) => this.setState({hometown})}
                  />
                    <Button onPress={() => { this.updateUserDB(); }} >
                      <ButtonText>Done</ButtonText>
                    </Button>
                    <Button onPress={() => { this.closeModal() }} >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
              </ModalView>
              break;

            case "updateBio":
              modalDisplay = 
              <ModalView>
                  <Title>update gender</Title>
                  <BioInput 
                      placeholder='bio' 
                      placeholderTextColor={this.props.theme.LIGHT_GREY}
                      onChangeText={(bio) => this.setState({bio})}
                      maxLength={150}
                      multiline
                      numberOfLines={7}
                  />
                    <Button onPress={() => { this.updateUserDB(); }} >
                      <ButtonText>Done</ButtonText>
                    </Button>   
                    <Button onPress={() => { this.closeModal() }} >
                      <ButtonText>Cancel</ButtonText>
                    </Button>  
              </ModalView>
              break;

          default: 
            break;
        }


    return (
        <ThemeProvider theme={ this.props.theme }>
           
            <SettingContainer>
                <HeaderContainer>
                    <HeaderText>settings</HeaderText>
                    <Subtitle>here u view ur profile, update your info, change the app theme, etc!</Subtitle>
                    <Line />
                </HeaderContainer>

                <Collapse>
                    <CollapseHeader>
                        <Title> ⊳ profile info </Title>
                        <Subtitle>view & edit ur profile info</Subtitle>
                    </CollapseHeader>
                    <CollapseBody>
                    <Subtitle>tap items with the pencil to edit the information</Subtitle>
                    <ListContainer>
                    <KeyboardAwareScrollView
                style={{ backgroundColor: this.props.theme.BG_COLOR, maxHeight: 500}}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps={'handled'}
                >
                    <InfoArea>  
                    <ProfileImage source={{uri: this.state.userData.userPROFILEPIC}} />
                    <Text>✎</Text>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateName")}}>✎ name</EditItem>
                    <UserAttribute>{this.state.userData.userFNAME} {this.state.userData.userLNAME}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateGender")}}>✎ gender</EditItem>
                    <UserAttribute>{this.state.userData.userGENDER}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem>✎ classification</EditItem>
                    <UserAttribute>{this.state.userData.userGRADE_LEVEL}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem>✎ primary major</EditItem>
                    <UserAttribute>{this.state.userData.userMAJOR}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateHometown")}}>✎ hometown</EditItem>
                    <UserAttribute>{this.state.userData.userHOMETOWN}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem>✎ graduation date</EditItem>
                    <UserAttribute>{this.state.userData.userGRAD_DATE}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateBio")}}>✎ bio</EditItem>
                    <UserAttribute>{this.state.userData.userABOUT}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem>UARK id</EditItem>
                    <UserAttribute>{this.state.userData.userID}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem>UARK email</EditItem>
                    <UserAttribute>{this.state.userData.userEMAIL}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem>enrolled courses</EditItem>
                    <UserAttribute>{this.state.userData.userCLASSES}</UserAttribute>
                    </InfoArea>
                    </KeyboardAwareScrollView>
                    </ListContainer>
                    </CollapseBody>
                </Collapse>
                  

        <Line /> 

          <Collapse>
              <CollapseHeader>
                <Title> ⊳ themes </Title>
                <Subtitle>tap to change the app theme!</Subtitle>
              </CollapseHeader>
              <CollapseBody>
              <ListContainer>
              <EditItem onPress={() => {
                  this.setModalVisible(true, "lightThemes")}} >light themes</EditItem>
              <EditItem onPress={() => {
                  this.setModalVisible(true, "darkThemes")}} >dark themes</EditItem>
              </ListContainer>
                
              </CollapseBody>
          </Collapse>

          <Modal isVisible={this.state.modalVisible}>
            <ModalContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {modalDisplay}
            </TouchableWithoutFeedback> 
          </ModalContainer>
        </Modal>


        <AccordionList
                  list={this.state.list}
                  header={this._head}
                  body={this._body}
                  keyExtractor={item => item.key}
                />

      
                   
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






