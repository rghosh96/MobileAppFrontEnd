import React, { Component } from 'react';
import { UserInputModal, UserBioInputModal, ProfileImageModal,
  UserDropDownModal, CheckBoxModal } from './InputModals'
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal';
import { HeaderText, Subtitle, Text, Button } from '../../theming/masterStyle'
import { ProfileImage } from '../../theming/dashStyle'
import {CLOUD_NAME, CLOUD_PRESET, CLOUD_BASE_API} from "@env"
import { SettingContainer, ModalContainer, Line, Title, EditItem, UserAttribute, InfoArea, 
   ListContainer, SubSettingHeader } from '../../theming/settingStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncImage from '../AsyncImage'




class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.updateUserDB = this.updateUserDB.bind(this)
    this.updateState = this.updateState.bind(this)
    this.setImageURI = this.setImageURI.bind(this)
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this)
  }
  
    state = {
        modalVisible: false,
        user: '',
        userLoaded: false,
        userData: '',
        modalContent: '',
        fName: '',
        lName: '',
        gender: '',
        experience: '',
        classification: '',
        grad: '',
        hometown: '',
        major: '',
        bio: '',
        profilePic: '',
        imageURI: '',
        research: '',
        sendMessages: '',
        uploadingImage: false,
        imageSet: false,
      };

      updateState = (attribute, data) => {
        console.log("trynna update state")
        console.log(attribute)
        console.log(data)
        this.setState({
          [attribute]: data
        })
      }

      setImageURI = (uri) => {
        this.setState({ imageURI: uri })
        console.log("just set image in SETTINGS")
        console.log(this.state)
        let cloudFile = {uri: this.state.imageURI, type: "jpg"
            , name: this.state.user}
        this.uploadToCloudinary(cloudFile);
      }
    
      uploadToCloudinary(photo) {
        console.log("UPLOADING TO CLOUD ...")
          if (this.state.imageURI !== '') {
            this.setState({ 
              uploadingImage: false,
              imageSet: false })
              const data = new FormData();
              data.append('cloud_name', CLOUD_NAME)
              data.append('file', photo)
              data.append('upload_preset', CLOUD_PRESET)
              this.setState({uploadingImage: true})
              fetch(CLOUD_BASE_API, {
                  method: 'POST',
                  body: data
              }).then(res=>res.json()).then(data=> {
                  console.log(data)
                  console.log(data.secure_url)
                  this.setState({ profilePic: data.secure_url,
                    uploadingImage: false,
                    imageSet: true })
              })
          }
      }


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
            })
            .catch((error) => console.error(error))
            .finally(() => {
              if (data.isError === false) {
                console.log("we got set the data!")
                let userInfo = data.result[0]
                this.setState({ 
                  fName: userInfo.userFNAME,
                  lName: userInfo.userLNAME,
                  gender: userInfo.userGENDER,
                  experience: userInfo.userPROGRAM_EXP,
                  classification: userInfo.userGRADE_LEVEL,
                  grad: userInfo.userGRAD_DATE,
                  hometown: userInfo.userHOMETOWN,
                  major: userInfo.userMAJOR,
                  bio: userInfo.userABOUT,
                  profilePic: userInfo.userPROFILEPIC,
                  research: userInfo.userRESEARCH,
                  sendMessages: userInfo.userMSG_TEACHER,
                  userData: data.result[0] })
              }
              this.setState({userLoaded: true})
              // if successful addition to db, navigate to create profile
              console.log("finally block") 
            })
      }

    

    
    async getToken() {
      try {
          console.log("before getting item");
        let userId = await AsyncStorage.getItem("user");
        this.setState({user: userId})
        this.getUserData(this.state.user)
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }


    async componentDidMount() {
      this.getToken()
    }

    updateUserDB = () => {
      console.log("updating user ...")
      console.log(this.state.profilePic)
      const updatedUser={
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
              userID: this.state.user, 
              values: {
                  userHOMETOWN: this.state.hometown,
                  userMAJOR: this.state.major,
                  userGRAD_DATE: this.state.grad,
                  userGRADE_LEVEL: this.state.classification,
                  userABOUT: this.state.bio,
                  userGENDER: this.state.gender,
                  userPROFILEPIC: this.state.profilePic,
                  userPROGRAM_EXP: this.state.experience,
                  userRESEARCH: this.state.research,
                  userMSG_TEACHER: this.state.sendMessages
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
              if (data.isError === false) {
                  this.setState({success: true})
              } else {
                  this.setState({success: false})
              }
              
          })
          .catch((error) => console.error(error))
          .finally(() => {
              this.getUserData(this.state.user)
              this.setState({modalVisible: !this.state.modalVisible,
                imageSet: false
              }); 
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
        modalVisible: !this.state.modalVisible,
        imageSet: false });
    }


    render() {
        const { modalVisible } = this.state;
        // switch statement to determine modal contents
        let modalDisplay;
        switch(this.state.modalContent) {
          case "updateProfilePic":
            modalDisplay = <ProfileImageModal 
            updateUserDB={this.updateUserDB}
            setImageURI={this.setImageURI}
            imageSet={this.state.imageSet}
            uploadingImage={this.state.uploadingImage}
            closeModal={this.closeModal} />
            break;

          case "updateGender":
            modalDisplay = <UserDropDownModal 
              infoType="gender"
              items={[
                {label: 'cis woman', value: 'cis woman'},
                {label: 'cis man', value: 'cis man'},
                {label: 'trans woman', value: 'trans woman'},
                {label: 'trans man', value: 'trans man'},
                {label: 'non-binary', value: 'non-binary'},
                {label: 'gender fluid', value: 'gender fluid'},
                {label: 'gender neutral', value: 'gender neutral'},
                {label: 'prefer not to say', value: 'prefer not to say'},
                {label: 'other', value: 'other'},
              ]}
              updateState={this.updateState}
              updateUserDB={this.updateUserDB}
              closeModal={this.closeModal} />
            break;

          case "updateHometown":
            modalDisplay = <UserInputModal 
              infoType="hometown"
              updateState={this.updateState}
              updateUserDB={this.updateUserDB}
              closeModal={this.closeModal} />
            break;

          case "updateBio":
            modalDisplay = <UserBioInputModal 
            infoType="bio"
            updateState={this.updateState}
            updateUserDB={this.updateUserDB}
            closeModal={this.closeModal} />
            break;

          case "updateResearch":
            modalDisplay = <UserBioInputModal 
            infoType="research"
            updateState={this.updateState}
            updateUserDB={this.updateUserDB}
            closeModal={this.closeModal} />
            break;

          case "updateSendMessages":
            modalDisplay = <CheckBoxModal 
            infoType="sendMessages"
            sendMessages={this.state.sendMessages}
            updateState={this.updateState}
            updateUserDB={this.updateUserDB}
            closeModal={this.closeModal} />
            break;

          case "updateExperience":
            modalDisplay = <UserDropDownModal 
              infoType="experience"
              items={[
                {label: 'little', value: '1'},
                {label: 'moderate', value: '2'},
                {label: 'a lot', value: '3'},
              ]}
              updateState={this.updateState}
              updateUserDB={this.updateUserDB}
              closeModal={this.closeModal} />
            break;

          case "updateClassification":
            modalDisplay = <UserDropDownModal 
              infoType="classification"
              items={[
                {label: 'freshman', value: 'freshman'},
                {label: 'sophomore', value: 'sophomore'},
                {label: 'junior', value: 'junior'},
                {label: 'senior', value: 'senior'},
                {label: 'super senior', value: 'super senior'},
                {label: 'grad student', value: 'grad student'},
              ]}
              updateState={this.updateState}
              updateUserDB={this.updateUserDB}
              closeModal={this.closeModal} />
            break;

          case "updateGradDate":
            modalDisplay = <UserDropDownModal 
              infoType="grad"
              items={[
                {label: 'dec 2020', value: 'dec 2020'},
                {label: 'may 2021', value: 'may 2021'},
                {label: 'dec 2021', value: 'dec 2021'},
                {label: 'may 2022', value: 'may 2022'},
                {label: 'dec 2022', value: 'dec 2022'},
              ]}
              updateState={this.updateState}
              updateUserDB={this.updateUserDB}
              closeModal={this.closeModal} />
            break;

          case "updateMajor":
          modalDisplay = <UserDropDownModal 
            infoType="major"
            items={[
              {label: 'computer science', value: 'computer science'},
              {label: 'computer engineering', value: 'computer engineering'},
              {label: 'mathematics', value: 'mathematics'},
            ]}
            updateState={this.updateState}
            updateUserDB={this.updateUserDB}
            closeModal={this.closeModal} />
          break;

          default: 
            break;
        }

        let userPic
        this.state.userData.userPROFILEPIC === null || this.state.userData.userPROFILEPIC === "null" ? 
        userPic = cuteBird : userPic = this.state.userData.userPROFILEPIC

    const noComment = "--"
    if (this.state.userData.userSTATUS === "student") {
    return (
        
        <ThemeProvider theme={ this.props.theme }>
             {console.log("IMAGE LOAD: " + this.state.didLoad)}
           {console.log(this.props.theme)}
            <SettingContainer>
                <SubSettingHeader>
                    <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={31} color={this.props.theme.PRIMARY_COLOR} />
                    <Title>profile settings</Title>
                </SubSettingHeader>
                    <Subtitle>here u can update your basic profile! fields with the pencil are editable.</Subtitle>
                    <Line />
                    <ListContainer showsVerticalScrollIndicator={false} >
                  
                    <InfoArea>  
                    <AsyncImage source={{uri: userPic}} type="profile" />
                    <UserAttribute onPress={() => {
                      this.setModalVisible(true, "updateProfilePic")}}>✎</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem>name</EditItem>
                    <UserAttribute>{this.state.userData.userFNAME} {this.state.userData.userLNAME}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateGender")}}>✎ gender</EditItem>
                    <UserAttribute>{this.state.userData.userGENDER}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateExperience")}}>✎ programming experience</EditItem>
                    <UserAttribute>{this.state.userData.userPROGRAM_EXP}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateClassification")}}>✎ classification</EditItem>
                    <UserAttribute>{this.state.userData.userGRADE_LEVEL}</UserAttribute>
                    </InfoArea>

                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateMajor")}}>✎ primary major</EditItem>
                    <UserAttribute>{this.state.userData.userMAJOR}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateHometown")}}>✎ hometown</EditItem>
                    <UserAttribute>{this.state.userData.userHOMETOWN}</UserAttribute>
                    </InfoArea>
                    
                    <InfoArea>
                    <EditItem onPress={() => {
                      this.setModalVisible(true, "updateGradDate")}}>✎ graduation date</EditItem>
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
                   
                    </ListContainer>
              

          <Modal isVisible={this.state.modalVisible}>
            <ModalContainer>
        
            {modalDisplay}
           
          </ModalContainer>
        </Modal>

        </SettingContainer>
    
        </ThemeProvider>
    ); }
    else {
      return (
      <ThemeProvider theme={ this.props.theme }>
      {console.log(this.state)}
     <SettingContainer>
         <SubSettingHeader>
             <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={31} color={this.props.theme.PRIMARY_COLOR} />
             <Title>profile settings</Title>
         </SubSettingHeader>
             <Subtitle>here u can update your basic profile! fields with the pencil are editable.</Subtitle>
             <Line />
             <ListContainer >
           
             <InfoArea>  
             <AsyncImage source={{uri: userPic}} type="profile" />
             <UserAttribute onPress={() => {
               this.setModalVisible(true, "updateProfilePic")}}>✎</UserAttribute>
             </InfoArea>

             <InfoArea>
             <EditItem>name</EditItem>
             <UserAttribute>{this.state.userData.userFNAME} {this.state.userData.userLNAME}</UserAttribute>
             </InfoArea>

             <InfoArea>
             <EditItem onPress={() => {
               this.setModalVisible(true, "updateGender")}}>✎ gender</EditItem>
             <UserAttribute>{this.state.userData.userGENDER}</UserAttribute>
             </InfoArea>

             
             <InfoArea>
             <EditItem onPress={() => {
               this.setModalVisible(true, "updateHometown")}}>✎ hometown</EditItem>
             <UserAttribute>{this.state.userData.userHOMETOWN}</UserAttribute>
             </InfoArea>

             <InfoArea>
             <EditItem onPress={() => {
               this.setModalVisible(true, "updateResearch")}}>✎ research</EditItem>
             <UserAttribute>{this.state.userData.userRESEARCH}</UserAttribute>
             </InfoArea>

             <InfoArea>
             <EditItem onPress={() => {
               this.setModalVisible(true, "updateSendMessages")}}>✎ allow student messaging</EditItem>
             <UserAttribute>{this.state.userData.userMSG_TEACHER}</UserAttribute>
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
             <EditItem>currently teaching:</EditItem>
             <UserAttribute>{this.state.userData.userTEACHING_CLASSES}</UserAttribute>
             </InfoArea>
            
             </ListContainer>
       

   <Modal isVisible={this.state.modalVisible}>
     <ModalContainer>
 
     {modalDisplay}
    
   </ModalContainer>
 </Modal>

 </SettingContainer>

 </ThemeProvider>
)
    }
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}


export default connect(mapStateToProps, {pickTheme})(ProfileSettings);






