import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const screenWidth = Math.round(Dimensions.get('window').width);

import firebaseSDK from '../../firebaseSDK';

export default class ChatList extends Component {
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
        // console.log("A");
        // console.log(this.props);
        // console.log("B");
        //console.log(this.props.route.params.email);
        let name = this.state.userData.userLNAME;
        //console.log(name);
        // Probably change email to username or screen name
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
        <View style={styles.backarrow} key={index}>
          <TouchableOpacity 
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                name: match.userFNAME,
                avatar: match.userPROFILE_PIC,
                uname: match.userID,
              })
            }>
            <View style={styles.list}>
              <View style={styles.forwidth_left}>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 87,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    source={require('./Images/no_image.jpg')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.forwidth_right}>
                <Text style={styles.price}> {match.userFNAME} {match.userLNAME} </Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });

    // console.log(User);


    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.top_header}>
            <TouchableOpacity>
              <Image
                style={styles.nav_icon}
                source={require('./Images/nav.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.search_header}>
                <Image
                  style={styles.search_icon}
                  source={require('./Images/search.png')}
                />
                <TextInput
                  style={styles.search_box}
                  keyboardType="web-search"
                  placeholder="search name"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.home_padding}>
          {/* // SCROLLVIEW HERE */}
          <ScrollView>{User}</ScrollView>
        </View>
      </View>
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