import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, Text, H1, FacultyView, ListStyle, ListText, Subtitle } from '../theming/masterStyle'
import { Connections, HeaderText, ProfileText, ProfileImage, ProfileContainer, ConnectionsContainer, 
  PeopleImage, MatchesContainer, MatchesText, MatchesDash } from '../theming/dashStyle'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncImage from './AsyncImage'
import DashProfileModal from './DashProfileModal'
import { ModalContainer, Line } from '../theming/settingStyle'
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { DataTable } from 'react-native-paper';
import Loader from '../Loader';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.likeUser = this.likeUser.bind(this)
  }

  state = {
    fontsLoaded: false,
    user: '',
    userLoaded: false,
    userData: '',
    status: '',
    isFirstLaunch: true,
    randomMatches: [],
    topThree: [],
    loaded: false,
    user: '',
    modalContent: '',
    modalVisible: false,
    modalUser: null,
    userInterests: null,
    matches: [],
    halfHeartGang: [],
    icon: ''
  }

  getUserData(user, request) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getUser?USER_id=" + user;
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          if (this.state.userLoaded === true) {
              this.setState({ userData: data.result[0], loaded: true, status: data.result[0].userSTATUS })
          }
            
        })
  }

  getRandomMatches(user) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/matches/get3RandomMatches?USER_id=" + user;
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            console.log("RANDOM")
            data = data.result
            console.log(data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.getMatchObjects("randomMatches", data)
            
        })
  }

  getTopThree(user) {
    var data;
    var correctedArray = []
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/matches/getTop3Matches?USER_id=" + user;
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            console.log("TOP THREE")
            // data = data.res
            console.log(data.result)
            correctedArray = data.result.slice(0,3)
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({topThree: correctedArray})
        })
  }

  getProfCourseList(course) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/matches/getUsersFromClass?class=" + course;
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            console.log("IN GET PROF COURSE LIST")
            console.log(data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.props.navigation.navigate('ProfCourseList', {students: data.result, courseName: course})

        })
  }

  getMatchObjects(matchType, usersArray) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getAllUsers";
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            console.log("IN GET MATCH OBJECTS")
            console.log(matchType)
            // console.log(usersArray)
            // console.log(data)
            let matches = usersArray
            console.log("******************ALL USERS")
          console.log(matches)
            let matchesArray = data.result.filter(function (item) {
              console.log(item.userID)
              if(matches.includes(item.userID)) {
                return item
              }
            });
            console.log(matchesArray)
            console.log("MATCHES ARRAY")
            let threeArray = matchesArray.slice(0,3)
            // console.log(threeArray)
            this.setState({[matchType]: threeArray})
    })
    .catch((error) => console.error(error))
    .finally(() => {
    })
}

  getAllMatches(user) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getMatches?USER_id=" + user;
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
        .then((response) => response.text())
        .then((json) => {
          // parse the response & extract data
          data = JSON.parse(json)
          this.setState({ numMatches: data.result.length })
        })
        .catch((error) => console.error(error))
        .finally(() => {

        })
  }

  async getToken() {
    try {
      let userId = await AsyncStorage.getItem("user");
      this.setState({user: userId})
      this.getUserData(this.state.user, 0)
      this.getRandomMatches(this.state.user)
      this.getTopThree(this.state.user)
      this.getAllMatches(this.state.user)
    } catch (error) {
      console.log("Something went wrong", error);
    }
    this.setState({userLoaded: true})
    
  }  

  // load fonts
  async componentDidMount() {
    console.log("*********************NEW RENDER**********************")
    try {
      await Font.loadAsync({
        header: require('../assets/fonts/ArchivoBlack-Regular.ttf'),
        text: require('../assets/fonts/Spartan-Medium.ttf')
    })
    this.setState({fontsLoaded: true})
    } catch(e){
      console.log("error loading fonts")
    }
    this.getToken()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log("*********************NEW RENDER**********************")
      this.getToken()
    });
  }

  likeUser(likedUser, likeAction) {
    const like={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(
            {user1: this.state.user, 
            user2:likedUser, 
            action: likeAction})
    }
    // call api endpoint, sending in user to add to db
    fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/interaction/addInteraction`, like)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            let data = JSON.parse(json)
        })
        .catch((error) => console.error(error))
        .finally(() => {
            // if successful addition to db, navigate to create profile
            console.log("finally block for interactions")
            this.getAllMatches(this.state.user)
            this.getHalfHeartGang(this.state.user)
            this.getRandomMatches(this.state.user)
            this.getTopThree(this.state.user)
        })
        this.closeModal()
  }

  getAllMatches(user) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getMatches?USER_id=" + user;
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
        .then((response) => response.text())
        .then((json) => {
          // parse the response & extract data
          data = JSON.parse(json)
          this.setState({ matches: data.result })
        })
        .catch((error) => console.error(error))
        .finally(() => {
          console.log("finally block") 
        })
  }

  getHalfHeartGang(user) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getHalfHearts?USER_id=" + user;
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
        .then((response) => response.text())
        .then((json) => {
          // parse the response & extract data
          data = JSON.parse(json)
          this.setState({ halfHeartGang: data.result })
        })
        .catch((error) => console.error(error))
        .finally(() => {
          console.log("finally block") 
          
        })
  }

  getUserInterests(user, icon) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interest/getInterests?USER_id=" + user.userID;
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
            let interestsInfo = data.result[0]
            this.setState({ 
              userInterests: interestsInfo,
              modalVisible: true,
              modalContent: "ProfileModal",
              modalUser: user,
              icon: icon })
          }
        })
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setModalVisible(user, icon) {
    this.getUserInterests(user, icon)
  }

  closeModal(user) {
    this.setState({ 
      modalVisible: !this.state.modalVisible, });
  }

  render() {
    let classArray
    if (this.state.loaded) {
      this.state.status !== "student" ? classArray = this.state.userData.userTEACHING_CLASSES.split(",") : null
      console.log(classArray)
    }
    
    let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"
    let userPic
    this.state.userData.userPROFILEPIC === null || this.state.userData.userPROFILEPIC === "null" ? 
      userPic = cuteBird : userPic = this.state.userData.userPROFILEPIC
    let modalDisplay;
        switch(this.state.modalContent) {
          case "ProfileModal":
            modalDisplay = <DashProfileModal 
            user={this.state.modalUser}
            userInterests={this.state.userInterests}
            icon={this.state.icon}
            closeModal={this.closeModal}
            likeUser={this.likeUser} />
            break;
            
        default:
            break;
        }
    if (this.state.loaded === true && this.state.status === "student" && this.state.fontsLoaded === true) {
    return (
        <ThemeProvider theme={ this.props.theme }>
            <Container>
                <HeaderContainer>
                  <HeaderText>home</HeaderText>
                </HeaderContainer>
                <ProfileContainer>
                    <AsyncImage source={{uri: userPic}} type="profile"/>
                    <ProfileText>
                        {this.state.userData.userFNAME} {this.state.userData.userLNAME} {"\n"}
                        {this.state.userData.userMAJOR} {"\n"}
                        {this.state.userData.userGRADE_LEVEL}
                    </ProfileText>
                </ProfileContainer>
                
                <MatchesContainer>
                  <MatchesDash>
                    <MatchesText>top 3 matches</MatchesText>
                  </MatchesDash>
                  {this.state.topThree.map((user, index) => {
                  let profilePic
                  user.userPROFILEPIC === null || user.userPROFILEPIC === "null" ? profilePic = cuteBird : profilePic = user.userPROFILEPIC
                  let isMatched = this.state.matches.includes(user.userID)
                  let halfHeart = this.state.halfHeartGang.some((heart => heart['user'] === user.userID && heart['likeStatus'] === "yes" ))
                  let icon;
                  isMatched ? icon = "heart" : icon = "heart-outline"
                  halfHeart ? icon="heart-half-full" : icon
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => this.setModalVisible(user, icon)}>
                      <AsyncImage source={{ uri: profilePic}} type="people"/>
                    </TouchableWithoutFeedback>
                  ) 
                  })}
                </MatchesContainer>

                <MatchesContainer>
                {this.state.randomMatches.map((user, index) => {
                  let profilePic
                  user.userPROFILEPIC === null || user.userPROFILEPIC === "null" ? profilePic = cuteBird : profilePic = user.userPROFILEPIC
                  let isMatched = this.state.matches.includes(user.userID)
                  let halfHeart = this.state.halfHeartGang.some((heart => heart['user'] === user.userID && heart['likeStatus'] === "yes" ))
                  let icon;
                  isMatched ? icon = "heart" : icon = "heart-outline"
                  halfHeart ? icon="heart-half-full" : icon
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => this.setModalVisible(user, icon)}>
                      <AsyncImage source={{ uri: profilePic}} type="people"/>
                    </TouchableWithoutFeedback>
                  ) 
                  })}
                  <MatchesDash>
                    <MatchesText>random matches</MatchesText>
                  </MatchesDash>
                </MatchesContainer>

                <ConnectionsContainer>
                  <Connections onPress={() =>
                          this.props.navigation.navigate('Connections')}>{this.state.matches.length}</Connections>
                  <Text>total connections</Text>
                </ConnectionsContainer>
                
                <Modal isVisible={this.state.modalVisible}>
                    <ModalContainer>
                        {modalDisplay}
                    </ModalContainer>
                </Modal>

            </Container>
        </ThemeProvider>
    ); } else if (this.state.fontsLoaded === true) {
      return (
        <ThemeProvider theme={ this.props.theme }>
        <Container>
            <HeaderContainer>
              <HeaderText>home</HeaderText>
            </HeaderContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileContainer style={{marginTop:75, marginBottom: 35}}>
                <ProfileImage source={{uri: this.state.userData.userPROFILEPIC}} />
                <Subtitle style={{marginLeft: 10, height: 50}}  >
                    {this.state.userData.userFNAME} {this.state.userData.userLNAME} {"\n"}
                    {this.state.userData.userSTATUS} 
                </Subtitle>
            </ProfileContainer>
            <FacultyView >
            <Line />
            <H1 >your bio:</H1>
              <Subtitle style={{textAlign:'center'}}>{this.state.userData.userABOUT}</Subtitle>
            <H1>your research:</H1>
            <Subtitle  >{this.state.userData.userRESEARCH}</Subtitle>
            <H1>courses you teach:</H1>
            <Subtitle>tap one of your courses to see what students you have!</Subtitle>
            
            {classArray ? classArray.map((course, index) => {return(
              <ListStyle key={index}>
              <ListText key={index} onPress={() =>this.getProfCourseList(course)}>{course.substring(0, 14)}</ListText>
              </ListStyle>
            )} ) : null}
            
            </FacultyView>
            </ScrollView>
            </Container>
            </ThemeProvider>
      )
    } else { return(<Loader />) }
  } 
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(Dashboard);




