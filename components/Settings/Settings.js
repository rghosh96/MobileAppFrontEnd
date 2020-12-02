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
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.updateUserDB = this.updateUserDB.bind(this)
    this.updateState = this.updateState.bind(this)
    this.setImageURI = this.setImageURI.bind(this)
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this)
    this.updateInterests = this.updateInterests.bind(this)
  }
  
    state = {
        modalVisible: false,
        user: '',
        userLoaded: false,
        interestsLoaded: false,
        userData: '',
        userInterests: '',
        modalContent: '',
        fName: '',
        lName: '',
        gender: '',
        classification: '',
        grad: '',
        hometown: '',
        major: '',
        bio: '',
        profilePic: '',
        imageURI: '',
        uploadingImage: false,
        imageSet: false,
        fashionRating: null,
        foodRating: null,
        gameRating: null,
        outRating: null,
        musicRating: null,
        readRating: null,
        fashionComment: null,
        foodComment: null,
        gamingComment: null,
        outdoorsComment: null,
        musicComment: null,
        readingComment: null,
        noComment: "--"
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
                  classification: userInfo.userGRADE_LEVEL,
                  grad: userInfo.userGRAD_DATE,
                  hometown: userInfo.userHOMETOWN,
                  major: userInfo.userMAJOR,
                  bio: userInfo.userABOUT,
                  profilePic: userInfo.userPROFILEPIC,
                  userData: data.result[0] })
              }
              this.setState({userLoaded: true})
              // if successful addition to db, navigate to create profile
              console.log("finally block") 
            })
      }

      getUserInterests(user) {
        console.log("in get user interests")
        var data;
        let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interest/getInterests?USER_id=" + user;
        console.log(apiEndpoint)
        // call api endpoint, sending in user to add to db
        fetch(apiEndpoint,)
            .then((response) => response.text())
            .then((json) => {
              // parse the response & extract data
              data = JSON.parse(json)
              console.log(data)
            })
            .catch((error) => console.error(error))
            .finally(() => {
              if (data.isError === false) {
                console.log("we got set the data!")
                let interestsInfo = data.result[0]
                this.setState({ 
                  fashionRating: interestsInfo.interestFASHION,
                  foodRating: interestsInfo.interestFOOD,
                  gameRating: interestsInfo.interestGAMING,
                  outRating: interestsInfo.interestOUTDOORS,
                  musicRating: interestsInfo.interestMUSIC,
                  readRating: interestsInfo.interestREADING,
                  fashionComment: interestsInfo.interestFASHION_COMMENT,
                  foodComment: interestsInfo.interestFOOD_COMMENT,
                  gamingComment: interestsInfo.interestGAMING_COMMENT,
                  outdoorsComment: interestsInfo.interestOUTDOORS_COMMENT,
                  musicComment: interestsInfo.interestMUSIC_COMMENT,
                  readingComment: interestsInfo.interestREADING_COMMENT,
                  userInterests: interestsInfo })
              }
              this.setState({interestsLoaded: true})
              // if successful addition to db, navigate to create profile
              console.log("finally block") 
            })
      }

      updateInterests() {
        console.log("INSIDE ADD INTERSTEST")
        console.log(this.state)
        const interests={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                interestUSER: this.state.user, 
                values: {
                    interestFOOD: this.state.foodRating,
                    interestFOOD_COMMENT: this.state.foodComment,
                    interestFASHION: this.state.fashionRating,
                    interestFASHION_COMMENT: this.state.fashionComment,
                    interestOUTDOORS: this.state.outRating,
                    interestOUTDOORS_COMMENT: this.state.outdoorsComment,
                    interestGAMING: this.state.gameRating,
                    interestGAMING_COMMENT: this.state.gamingComment,
                    interestMUSIC: this.state.musicRating,
                    interestMUSIC_COMMENT: this.state.musicComment,
                    interestREADING: this.state.readRating,
                    interestREADING_COMMENT: this.state.readingComment
                }
            })
        }
        console.log("INTERESTS JSON")
        console.log(interests)
        // call api endpoint, sending in user to add to db
        fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/interest/updateInterests`, interests)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                let data = JSON.parse(json)
                console.log(data)
                
            })
            .catch((error) => console.error(error))
            .finally(() => {
                console.log("finally updated interests")
                this.getUserInterests(this.state.user)
                this.setState({modalVisible: !this.state.modalVisible }); 
            })
      }
    
    async getToken() {
      try {
          console.log("before getting item");
        let userId = await AsyncStorage.getItem("user");
        this.setState({user: userId})
        this.getUserData(this.state.user)
        this.getUserInterests(this.state.user)
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
                  userPROFILEPIC: this.state.profilePic
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
          case "lightThemes":
            modalDisplay = <LightThemeModal closeModal={this.closeModal} />
            break;

          case "darkThemes":
            modalDisplay = <DarkThemeModal closeModal={this.closeModal} />
            break;

          case "updateProfilePic":
            modalDisplay = <ProfileImageModal 
            updateUserDB={this.updateUserDB}
            setImageURI={this.setImageURI}
            imageSet={this.state.imageSet}
            uploadingImage={this.state.uploadingImage}
            closeModal={this.closeModal} />
            break;

          case "updateGender":
            modalDisplay = <UserInputModal 
              infoType="gender"
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
          modalDisplay = <UserSelectClassificationModal 
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

          case "fashionUpdate":
          modalDisplay = <InterestModal 
            title="fashion interests"
            ratingType="fashionRating"
            commentType="fashionComment"
            rating={this.state.fashionRating}
            comment={this.state.fashionComment}
            icon="shopping"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
          break;

          case "foodUpdate":
          modalDisplay = <InterestModal 
            title="food interests"
            ratingType="foodRating"
            commentType="foodComment"
            comment={this.state.foodComment}
            rating={this.state.foodRating}
            icon="food-apple"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
          break;

          case "gameUpdate":
          modalDisplay = <InterestModal 
            title="gaming interests"
            ratingType="gameRating"
            commentType="gamingComment"
            rating={this.state.gameRating}
            comment={this.state.gamingComment}
            icon="gamepad-variant"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
          break;

          case "outUpdate":
          modalDisplay = <InterestModal 
            title="outdoors interests"
            ratingType="outRating"
            commentType="outdoorsComment"
            rating={this.state.outRating}
            comment={this.state.outdoorsComment}
            icon="pine-tree"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
          break;

          case "musicUpdate":
          modalDisplay = <InterestModal 
            title="music interests"
            ratingType="musicRating"
            commentType="musicComment"
            rating={this.state.musicRating}
            comment={this.state.musicComment}
            icon="music-note"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
          break;

          case "readUpdate":
          modalDisplay = <InterestModal 
            title="reading interests"
            ratingType="readRating"
            commentType="readingComment"
            rating={this.state.readRating}
            comment={this.state.readingComment}
            icon="book"
            updateState={this.updateState}
            updateInterests={this.updateInterests}
            closeModal={this.closeModal} />
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

                <Collapse>
                    <CollapseHeader>
                        <Title> ⊳ general user info </Title>
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
                    <Text onPress={() => {
                      this.setModalVisible(true, "updateProfilePic")}}>✎</Text>
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
                    </KeyboardAwareScrollView>
                    </ListContainer>
                    </CollapseBody>
                </Collapse>
        <Line /> 
        <Collapse>
              <CollapseHeader>
                <Title> ⊳ user interests info </Title>
                <Subtitle>view & edit your current interests</Subtitle>
              </CollapseHeader>
              <CollapseBody>
              <Subtitle>tap to edit your interest info!</Subtitle>
              <ListContainer>
              <KeyboardAwareScrollView
                    style={{ backgroundColor: this.props.theme.BG_COLOR, maxHeight: 400}}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'handled'}
                    >
              <RatingContainer>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <EditItem onPress={() => {
                      this.setModalVisible(true, "fashionUpdate")}}>✎ fashion rating 
                      ({this.state.userInterests.interestFASHION}/5)</EditItem>
                  <CustomRatings 
                  infoType="fashionRating" 
                  updateState={this.updateState}
                  rating={this.state.userInterests.interestFASHION} 
                  icon="shopping"
                  readOnly={true}/>
                  </View>
                    <UserAttribute>{this.state.userInterests.interestFASHION_COMMENT ? 
                    this.state.userInterests.interestFASHION_COMMENT : noComment}</UserAttribute>
                </RatingContainer>
                <RatingContainer>
                  <View style={{alignItems: 'center', marginBottom: 10}}>
                  <EditItem onPress={() => {
                      this.setModalVisible(true, "foodUpdate")}}>✎ food rating (
                        {this.state.userInterests.interestFOOD}/5)</EditItem>
                  <CustomRatings 
                    infoType="foodRating" 
                    updateState={this.updateState}
                    rating={this.state.userInterests.interestFOOD} 
                    icon="food-apple"
                    readOnly={true}
                  /> 
                  </View>
                    <UserAttribute>{this.state.userInterests.interestFOOD_COMMENT ? 
                    this.state.userInterests.interestFOOD_COMMENT : noComment}</UserAttribute>
                </RatingContainer>

                <RatingContainer>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                <EditItem onPress={() => {
                      this.setModalVisible(true, "gameUpdate")}}>✎ gaming rating 
                      ({this.state.userInterests.interestGAMING}/5)</EditItem> 
                <CustomRatings 
                  infoType="gameRating" 
                  updateState={this.updateState}
                  rating={this.state.userInterests.interestGAMING} 
                  icon="gamepad-variant"
                  readOnly={true}
                /> 
                </View>
                  <UserAttribute>{this.state.userInterests.interestGAMING_COMMENT ? 
                  this.state.userInterests.interestGAMING_COMMENT : noComment}</UserAttribute>
                </RatingContainer>

                <RatingContainer>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                <EditItem onPress={() => {
                      this.setModalVisible(true, "outUpdate")}}>✎ outdoors rating 
                      ({this.state.userInterests.interestOUTDOORS}/5)</EditItem>
                <CustomRatings 
                  infoType="outRating" 
                  updateState={this.updateState}
                  rating={this.state.userInterests.interestOUTDOORS} 
                  icon="pine-tree"
                  readOnly={true}
                /> 
                </View>
                  <UserAttribute>{this.state.userInterests.interestOUTDOORS_COMMENT ? 
                  this.state.userInterests.interestOUTDOORS_COMMENT : noComment}</UserAttribute>
                </RatingContainer>

                <RatingContainer>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                <EditItem onPress={() => {
                      this.setModalVisible(true, "musicUpdate")}}>✎ music rating 
                      ({this.state.userInterests.interestMUSIC}/5)</EditItem>
                <CustomRatings 
                  infoType="musicRating" 
                  updateState={this.updateState}
                  rating={this.state.userInterests.interestMUSIC} 
                  icon="music-note"
                  readOnly={true}
                />
                </View>
                  <UserAttribute>{this.state.userInterests.interestMUSIC_COMMENT ? 
                  this.state.userInterests.interestMUSIC_COMMENT : noComment}</UserAttribute>
                </RatingContainer>

                <RatingContainer>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                <EditItem onPress={() => {
                      this.setModalVisible(true, "readUpdate")}}>✎ reading rating 
                      ({this.state.userInterests.interestREADING}/5)</EditItem>
                <CustomRatings 
                  infoType="readRating" 
                  updateState={this.updateState}
                  rating={this.state.userInterests.interestREADING} 
                  icon="book"
                  readOnly={true}
                /> 
                </View>
                  <UserAttribute>{this.state.userInterests.interestREADING_COMMENT ? 
                  this.state.userInterests.interestREADING_COMMENT : noComment}</UserAttribute>
                </RatingContainer>            
             </KeyboardAwareScrollView>
              </ListContainer>
                
              </CollapseBody>
          </Collapse>
        <Line />

          <Collapse>
              <CollapseHeader>
                <Title> ⊳ themes </Title>
                <Subtitle>change the app theme!</Subtitle>
              </CollapseHeader>
              <CollapseBody>
                <Button onPress={() => {
                  this.setModalVisible(true, "lightThemes")}}>
                <ButtonText  >light themes</ButtonText>
                </Button>
              
                <Button onPress={() => {
                  this.setModalVisible(true, "darkThemes")}}>
                <ButtonText  >dark themes</ButtonText>
                </Button>
              </CollapseBody>
          </Collapse>

          <Modal isVisible={this.state.modalVisible}>
            <ModalContainer>
        
            {modalDisplay}
           
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






