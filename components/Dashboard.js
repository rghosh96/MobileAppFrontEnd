import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components/native';
import { Container, HeaderContainer, Text } from '../theming/masterStyle'
import LottieView from 'lottie-react-native';
import { Connections, HeaderText, ProfileText, ProfileImage, ProfileContainer, ConnectionsContainer, 
  PeopleImage, MatchesContainer, MatchesText, MatchesDash } from '../theming/dashStyle'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncImage from './AsyncImage'
import DashProfileModal from './DashProfileModal'
import { ModalContainer } from '../theming/settingStyle'
import Modal from 'react-native-modal';



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  state = {
    user: '',
    userLoaded: false,
    userData: '',
    isFirstLaunch: true,
    numMatches: null,
    randomMatches: [],
    loaded: false,
    user: '',
    modalContent: '',
    modalVisible: false,
    modalUser: null,
    userInterests: null,
    matches: [],
    halfHeartGang: []
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
            if (request === 0) {
              this.setState({ userData: data.result[0] })
            }
            else if (request === 1) {
              this.setState({ randomMatches: [...this.state.randomMatches, data.result[0]] })
            }
          }
            
        })
  }

  getRandomMatches(user) {
    console.log("in get random matches")
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/matches/get3RandomMatches?USER_id=" + user;
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            data = data.result
        })
        .catch((error) => console.error(error))
        .finally(() => {
            console.log("finally block of RANDOM MATCHES") 
            console.log(data)
            this.getMatchObjects("randomMatches", data)
            
        })
  }

  getMatchObjects(matchType, usersArray) {
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getAllUsers";
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            // console.log("IN GET MATCH OBJECTS")
            // console.log(data)
            let matches = usersArray
            let matchesArray = data.result.filter(function (item) {
              console.log("IN FILTER")
              console.log(matches)
              if(matches.includes(item.userID)) {
                return item
              }
            });
            console.log("IN GET MATCH OBJECTS")
            console.log(matchesArray)
            this.setState({[matchType]: matchesArray})
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
        console.log("before getting item");
      let userId = await AsyncStorage.getItem("user");
      this.setState({user: userId})
      this.getUserData(this.state.user, 0)
      this.getRandomMatches(this.state.user)
      this.getAllMatches(this.state.user)
    } catch (error) {
      console.log("Something went wrong", error);
    }
    this.setState({userLoaded: true})
    this.setState({loaded: true})
  }  

  // load fonts
  async componentDidMount() {
    this.getToken()
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
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
    console.log(like)
    // call api endpoint, sending in user to add to db
    fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/interaction/addInteraction`, like)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            let data = JSON.parse(json)
            console.log(data)
        })
        .catch((error) => console.error(error))
        .finally(() => {
            // if successful addition to db, navigate to create profile
            console.log("finally block for interactions")
            this.getAllMatches(this.state.user)
            this.getHalfHeartGang(this.state.user)
        })
  }

  getAllMatches(user) {
    console.log("in get user interests")
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getMatches?USER_id=" + user;
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
        .then((response) => response.text())
        .then((json) => {
          // parse the response & extract data
          data = JSON.parse(json)
          console.log(data)
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
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
        .then((response) => response.text())
        .then((json) => {
          // parse the response & extract data
          data = JSON.parse(json)
          console.log("HALF HEART GANG:")
          console.log(data)
          this.setState({ halfHeartGang: data.result })
        })
        .catch((error) => console.error(error))
        .finally(() => {
          console.log("finally block") 
        })
  }

  getUserInterests(user) {
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
              modalUser: user, })
          }
        })
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setModalVisible(user) {
    this.getUserInterests(user)
  }

  closeModal(user) {
    this.setState({ 
      modalVisible: !this.state.modalVisible, });
  }

  render() {
    var r0, r1, r2
    let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"

    let modalDisplay;
        switch(this.state.modalContent) {
          case "ProfileModal":
            modalDisplay = <DashProfileModal 
            user={this.state.modalUser}
            userInterests={this.state.userInterests}
            closeModal={this.closeModal} />
            break;
            
        default:
            break;
        }

    if (this.state.randomMatches.length >= 3 ) {
      r0 = this.state.randomMatches[0].userPROFILEPIC ? this.state.randomMatches[0].userPROFILEPIC : cuteBird
      r1 = this.state.randomMatches[1].userPROFILEPIC ? this.state.randomMatches[1].userPROFILEPIC : cuteBird
      r2 = this.state.randomMatches[2].userPROFILEPIC ? this.state.randomMatches[2].userPROFILEPIC : cuteBird
    }
    if (!this.state.userLoaded && !this.state.loaded) {
      return <LottieView style={{height: 200}}source={require('../assets/loading.json')} autoPlay loop />
    } 
    return (
        <ThemeProvider theme={ this.props.theme }>
            <Container>
                <HeaderContainer>
                  <HeaderText>home</HeaderText>
                </HeaderContainer>
                <ProfileContainer>
                    <ProfileImage source={{uri: this.state.userData.userPROFILEPIC}} />
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
                  <PeopleImage source={require('../mockData/pic2.jpg')} />
                  <PeopleImage source={require('../mockData/pic5.jpg')} />
                  <PeopleImage source={require('../mockData/pic6.jpg')} />
                </MatchesContainer>

                <MatchesContainer>
                  <TouchableWithoutFeedback onPress={() => this.setModalVisible(this.state.randomMatches[0])}>
                    <AsyncImage source={{ uri: r0}} />
                  </TouchableWithoutFeedback>
                  
                  <TouchableWithoutFeedback onPress={() => this.setModalVisible(this.state.randomMatches[1])}>
                    <AsyncImage source={{ uri: r1}} />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.setModalVisible(this.state.randomMatches[2])}>
                    <AsyncImage source={{ uri: r2}} />
                  </TouchableWithoutFeedback>
                  <MatchesDash>
                    <MatchesText>random matches</MatchesText>
                  </MatchesDash>
                </MatchesContainer>

                <ConnectionsContainer>
                  <Connections onPress={() =>
                          this.props.navigation.navigate('Connections')}>{this.state.numMatches}</Connections>
                  <Text>total connections</Text>
                </ConnectionsContainer>
                
                <Modal isVisible={this.state.modalVisible}>
                    <ModalContainer>
                        {modalDisplay}
                    </ModalContainer>
                </Modal>

            </Container>
        </ThemeProvider>
    );
  } 
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(Dashboard);




