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


class Dashboard extends Component {
  state = {
    user: '',
    userLoaded: false,
    userData: '',
    isFirstLaunch: true
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
            if (data.isError === false) {
              console.log("we got user data!")
            }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          if (this.state.userLoaded === true) {
            console.log("we got set the data!")
            this.setState({ userData: data.result[0] })
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
    } catch (error) {
      console.log("Something went wrong", error);
    }
    this.setState({userLoaded: true})
  }  

  // load fonts
  async componentDidMount() {
    try {
      await Font.loadAsync({
        header: require('../assets/fonts/ArchivoBlack-Regular.ttf'),
        text: require('../assets/fonts/Spartan-Medium.ttf')
    })
    } catch(e){
      console.log("error loading fonts")
    }
    this.getToken()
  }

  render() {
    {console.log("INSIDE DASHBOARD")}
    console.log(this.state)
    if (!this.state.userLoaded) {
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
                  <PeopleImage source={require('../mockData/pic1.jpg')} />
                  <PeopleImage source={require('../mockData/pic4.jpg')} />
                  <PeopleImage source={require('../mockData/pic3.jpg')} />
                </MatchesContainer>

                <MatchesContainer>
                  <PeopleImage source={require('../mockData/pic2.jpg')} />
                  <PeopleImage source={require('../mockData/pic5.jpg')} />
                  <PeopleImage source={require('../mockData/pic6.jpg')} />
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




