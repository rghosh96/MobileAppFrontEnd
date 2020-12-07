import React, { Component } from 'react';
import CustomRatings from '../CustomRatings'
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { View } from 'react-native'
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { Subtitle} from '../../theming/masterStyle'
import { SettingContainer, RatingContainer, ModalContainer, Line, Title, EditItem, UserAttribute, InfoArea, 
    ListContainer, SubSettingHeader } from '../../theming/settingStyle'
 import { MaterialCommunityIcons } from '@expo/vector-icons'
import { InterestModal } from './InterestModals';



class InterestSettings extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.updateState = this.updateState.bind(this)
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
   
            <SubSettingHeader>
                    <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={31} color={this.props.theme.PRIMARY_COLOR} />
                    <Title>interest settings</Title>
                </SubSettingHeader>
                    <Subtitle>here u can view your interest ratings and comments, and update them as needed!</Subtitle>
                    <Line />
             

    

              <ListContainer style={{flex: .75}}>
              <KeyboardAwareScrollView
                    style={{ backgroundColor: this.props.theme.BG_COLOR}}
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


export default connect(mapStateToProps, {pickTheme})(InterestSettings);






