import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { CardContainer, ProfileImage, AllUsersList,
     Title  } from '../../theming/exploreStyle'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { HeaderText, Subtitle, Container, HeaderContainer } from '../../theming/masterStyle'
import AsyncImage from '../AsyncImage'

const screenWidth = Math.round(Dimensions.get('window').width);

import firebaseSDK from '../../firebaseSDK';

class ChatList extends Component {
  constructor() {
    super();
    this.state = {
        user: '',
        userData: null,
      auth_data: [],
      matches: [],
      likedUsers: [],
      uid: '',
      uname: '',
      uemail: '',
    };
    // if (firebaseSDK.signedIn()) {
    //   this._retrieveData();
    //   this.getAllMatches();
    // }
    // console.log();
  }

  async componentDidMount () {
      console.log("IN CHATLIST")
      this.getToken();
  }

  getUserData(user, request) {
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
            // this.setState({userData: data.result[0]})
        })
        .catch((error) => console.error(error))
        .finally(() => {
            if (request === 0) {
                this.setState({ userData: data.result[0] })
                this._retrieveData();
                this.getAllMatches();
            }
            else if (request === 1) {
                this.setState({ likedUsers: [...this.state.likedUsers, data.result[0]] })
            }
            
            console.log("finally block") 
            
        })
  }

  async getToken() {
    try {
        console.log("before getting item");
      let userId = await AsyncStorage.getItem("user");
      console.log(userId)
      this.setState({user: userId })
      this.getUserData(this.state.user, 0)
    } catch (error) {
      console.log("Something went wrong", error);
    }
    this.setState({userLoaded: true})
  }  

    _retrieveData = async () => {
        console.log("IN RETRIEVE DATA")
        console.log(this.state.userData)
        let name = this.state.userData.userLNAME;
        let email = this.state.userData.userEMAIL;
        let avatar = this.state.userPROFILEPIC;
        let u_id = firebaseSDK.uid;
        let _id = firebaseSDK.uid;
    };

  getAllMatches() {
    var name = this.state.userData.userID;
//    console.log('in get user interests');
//    console.log(firebaseSDK.displayName);
    var data;
    let apiEndpoint =
      'http://mobile-app.ddns.uark.edu/CRUDapis/interaction/getMatches?USER_id=' + name;
    console.log(apiEndpoint);
    // call api endpoint, sending in user to add to db
    fetch(apiEndpoint)
      .then((response) => response.text())
      .then((json) => {
        // parse the response & extract data
        data = JSON.parse(json);
        console.log(data);
        this.setState({ matches: data.result });
        console.log("----------------")
 //       console.log(this.state.matches)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (data.isError === false) {
          console.log('we got the data!');
        }
        this.setState({likedUsers: []})
        for (var i = 0; i < this.state.matches.length; i++) {
            this.getUserData(this.state.matches[i], 1)
        }   
      });
  }

  render() {
    
    var matches = this.state.likedUsers;
    console.log("IN RENDER");
    console.log(this.state.matches);
    console.log(this.state.likedUsers);
    let Data = this.state.auth_data;
    let User = matches.map((match, index) => {
      return (
        <View key={index}>
          <TouchableOpacity 
            onPress={() =>
              this.props.navigation.navigate('IndivChat', {
                name: this.state.user,
                avatar: match.userPROFILE_PIC,
                uname: match.userID,
                uFname: match.userFNAME
            })
            }>
            <CardContainer>
                    <TouchableOpacity>
                    <AsyncImage source={{uri: match.userPROFILEPIC}} />
                </TouchableOpacity>
                <View style={styles.forwidth_right}>
                <Title> {match.userFNAME} {match.userLNAME} </Title>
                </View>
            </CardContainer>
          </TouchableOpacity>
        </View>
      );
    });

    // console.log(User);
    console.log(this.props)

    return (
        <ThemeProvider theme={ this.props.theme }>
        <Container>
        <HeaderContainer>
            <HeaderText>chat</HeaderText>
            <Subtitle>here you can chat with all your current matches. tap a user to chat!
            </Subtitle>
        </HeaderContainer>
   
        <AllUsersList>
          {/* // SCROLLVIEW HERE */}
          {User}
        </AllUsersList>
     
      </Container>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  backarrow: {
    paddingBottom: 50,
    flexDirection: 'row',
  },
  top_header: {
    backgroundColor: '#ffffff',
    padding: 10,
    flexDirection: 'row',
  },
  nav_icon: {
    width: 40,
    height: 40,
  },
  search_header: {
    width: screenWidth - 100,
    flexDirection: 'row',
  },
  search_icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  search_box: {
    //height: 40,
    paddingTop: 10,
    //paddingBottom: 5,
    borderBottomColor: '#fff',
    color: '#000000',
    fontSize: 15,
    opacity: 1,
    width: screenWidth - 200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    //fontFamily:"Poppins"
  },
  home_padding: {
    padding: 10,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  forwidth_left: {
    width: '30%',
    //paddingBottom:30
  },
  forwidth_right: { width: '50%' },
  price: { color: '#0b85bd', fontSize: 18 /* paddingTop:20 */ },
  carname: { color: '#010000', fontSize: 10 },
  list: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#e3e3e1',
    // borderBottomWidth:2 ,
    paddingTop: 0,
    paddingBottom: 0,
    //marginTop: 3,
    //width: screenWidth / 2 - 30,
    //marginRight: 20
  },
});

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(ChatList);