import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal';
import ProfileModal from '../ProfileModal'
import ProfileCard from '../ProfileCard'
import { ModalContainer } from '../../theming/settingStyle'
import { AllUsersList } from '../../theming/exploreStyle'
import { HeaderText, Subtitle, Container, Text, HeaderContainer } from '../../theming/masterStyle'



class Explore extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.likeUser = this.likeUser.bind(this)
      }

    state = {
        user: '',
        allUsers: [],
        modalContent: '',
        modalVisible: false,
        modalUser: null,
        userInterests: null,
        matches: [],
        halfHeartGang: []
    }

    getAllUsers() {
        console.log("in get user data")
        var data;
        let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getAllUsers";
        console.log(apiEndpoint)
        // call api endpoint, sending in user to add to db
        fetch(apiEndpoint,)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                data = JSON.parse(json)
                if (data.isError === false) {
                    console.log(data)
                    this.setState({ allUsers: data.result })
                }
        })
        .catch((error) => console.error(error))
        .finally(() => {
            if (this.state.userLoaded === true) {
            console.log("we got set the data!")
            }
            // if successful addition to db, navigate to create profile
            console.log("finally block") 
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
        console.log("in get user interests")
        var data;
        let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/interest/getInterests?USER_id=" + user.userID;
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
                  userInterests: interestsInfo,
                  modalVisible: true,
                  modalContent: "ProfileModal",
                  modalUser: user, })
              }
            //   this.setState({interestsLoaded: true})
              // if successful addition to db, navigate to create profile
              console.log("finally block") 
            })
      }

      likeUser(likedUser, likeAction) {
        console.log("in interactions")
        // console.log(this.state.user)
        // console.log(likedUser)
        // console.log(likeAction)
        // create user body to send to api
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
            })
      }

      async getToken() {
        try {
            console.log("before getting item");
          let userId = await AsyncStorage.getItem("user");
          this.setState({user: userId})
          this.getAllUsers(this.state.user)
          this.getAllMatches(this.state.user)
          this.getHalfHeartGang(this.state.user)
        } catch (error) {
          console.log("Something went wrong", error);
        }
        this.setState({userLoaded: true})
      }  

    setModalVisible(user) {
        console.log("set modal visible")
        this.getUserInterests(user)
      }

      closeModal(user) {
        console.log("closing modal")
        this.setState({ 
          modalVisible: !this.state.modalVisible, });
      }


      async componentDidMount() {
        console.log("in component did mount")
        this.getToken()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getToken()
          });
      }

      componentWillUnmount() {
        this._unsubscribe();
      }

  render() {

      console.log(this.props.theme)
      let modalDisplay;
        switch(this.state.modalContent) {
          case "ProfileModal":
            modalDisplay = <ProfileModal 
            user={this.state.modalUser}
            userInterests={this.state.userInterests}
            closeModal={this.closeModal} />
            break;
            
        default:
            break;
        }

    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>explore</HeaderText>
                    <Subtitle>here you can explore and discover
                        fellow csce students! tap their name to view their profile. tap the
                        heart to send a match request!
                    </Subtitle>
                </HeaderContainer>
                
                <AllUsersList>
                {this.state.allUsers.map((user, index) => {
                  let isMatched = this.state.matches.includes(user.userID)
                  let halfHeart = this.state.halfHeartGang.includes(user.userID)
                  let icon;
                  isMatched ? icon = "heart" : icon = "heart-outline"
                  halfHeart ? icon="heart-half-full" : null
                  return user.userID != this.state.user ? (
                      <ProfileCard 
                          setModalVisible={this.setModalVisible}
                          user={user}
                          key={index}
                          likeUser={this.likeUser}
                          icon={icon}
                          isMatched={isMatched}
                          isLiked={halfHeart}/> 
                      )  :  null 
                  })}
                </AllUsersList>
                
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

export default connect(mapStateToProps, {pickTheme})(Explore);




