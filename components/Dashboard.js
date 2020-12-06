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


class Dashboard extends Component {
  state = {
    user: '',
    userLoaded: false,
    userData: '',
    isFirstLaunch: true,
    randomMatches: [],
     loaded: false
  }

  getUserData(user, request) {
    console.log("in get user data")
    console.log(user)
    console.log(request)
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
          if (this.state.userLoaded === true) {
            console.log("we got set the data!")
            if (request === 0) {
              this.setState({ userData: data.result[0] })
            }
            else if (request === 1) {
              console.log("REQUEST IS 1")
              console.log(data.result[0])
              this.setState({ randomMatches: [...this.state.randomMatches, data.result[0]] })
            }
          }
            // if successful addition to db, navigate to create profile
            console.log("finally block") 
            
        })
  }

  getRandomMatches(user) {
    console.log("in get user data")
    var data;
    let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/matches/get3RandomMatches?USER_id=" + user;
    console.log(apiEndpoint)
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint,)
        .then((response) => response.text())
        .then((json) => {
            // parse the response & extract data
            data = JSON.parse(json)
            console.log(data)
            data = data.result
        })
        .catch((error) => console.error(error))
        .finally(() => {
            console.log(data)
            console.log("finally block") 
            this.setState({randomMatches: []})
            for (let i = 0; i < 3; i++) {
              this.getUserData(data[i], 1)
            }
            
        })
  }

  async getToken(user) {
    try {
        console.log("before getting item");
      let userId = await AsyncStorage.getItem("user");
      this.setState({user: userId})
      this.getUserData(this.state.user, 0)
      this.getRandomMatches(this.state.user)
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

  render() {
    {console.log("INSIDE DASHBOARD")}

      var r0, r1, r2
      let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"
    if (this.state.randomMatches.length === 3 ) {
     r0 = this.state.randomMatches[0].userPROFILEPIC ? this.state.randomMatches[0].userPROFILEPIC : cuteBird
     r1 = this.state.randomMatches[1].userPROFILEPIC ? this.state.randomMatches[1].userPROFILEPIC : cuteBird
     r2 = this.state.randomMatches[2].userPROFILEPIC ? this.state.randomMatches[2].userPROFILEPIC : cuteBird
    }
    if (!this.state.userLoaded && !this.state.loaded) {
      return <LottieView style={{height: 200}}source={require('../assets/loading.json')} autoPlay loop />
    } 
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            {console.log("INSIDE VIEW")}
            <Container>
                <HeaderContainer>
                  <HeaderText>dashboard</HeaderText>
                </HeaderContainer>
                <ProfileContainer>
                  {console.log(this.state.userData.userPROFILEPIC)}
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
                    <PeopleImage source={{uri: r0 }} />
                  </TouchableWithoutFeedback>
                  
                  <TouchableWithoutFeedback onPress={() => alert('r1 tapped!')}>
                    <PeopleImage source={{uri: r1 }} />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => alert('r2 tapped!')}>
                    <PeopleImage source={{uri: r2 }} />
                  </TouchableWithoutFeedback>
                  
                  <MatchesDash>
                    <MatchesText>random matches</MatchesText>
                  </MatchesDash>
                </MatchesContainer>

                <ConnectionsContainer>
                  <Connections>11</Connections>
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




