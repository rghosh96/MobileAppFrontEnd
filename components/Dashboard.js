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


class Dashboard extends Component {
  state = {
    user: '',
    userLoaded: false,
    userData: '',
    isFirstLaunch: true,
    numMatches: null,
    randomMatches: [],
    loaded: false,
    r1Loaded: true,
    r2Loaded: true,
    r3Loaded: true,
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
            this.setState({randomMatches: []})
            for (let i = 0; i < 3; i++) {
              this.getUserData(data[i], 1)
            }
            
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

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    var r0, r1, r2
    let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"

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
                  <TouchableWithoutFeedback onPress={() => alert('r0 tapped!')}>
                    <AsyncImage source={{ uri: r0}} />
                  </TouchableWithoutFeedback>
                  
                  <TouchableWithoutFeedback onPress={() => alert('r1 tapped!')}>
                    <AsyncImage source={{ uri: r1}} />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => alert('r2 tapped!')}>
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




