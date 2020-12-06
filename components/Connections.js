import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import { Container, HeaderContainer, HeaderText, Subtitle } from '../theming/masterStyle'
import ProfileModal from './ProfileModal'
import ProfileCard from './ProfileCard'
import { AllUsersList } from '../theming/exploreStyle'
import Modal from 'react-native-modal';
import { ModalContainer } from '../theming/settingStyle'

class Connections extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.likeUser = this.likeUser.bind(this)
      }

    state = {
        user: '',
        userLoaded: false,
        userData: '',
        isFirstLaunch: true,
        matches: [],
        likedUsers: [],
        modalContent: '',
        modalVisible: false,
        modalUser: null,
        userInterests: null,
      }

      likeUser(likedUser, likeAction) {
        console.log("in interactions")
        console.log(this.state.user)
        console.log(likedUser)
        console.log(likeAction)
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
                likeAction === "no" ?
                this.getAllMatches(this.state.user, true) : this.getAllMatches(this.state.user, false) 
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
    getAllMatches(user, remove) {
        console.log("in get all matches")
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
              if (data.isError === false) {
                console.log("we got set the data!")
                
              }
            //   this.setState({interestsLoaded: true})
              // if successful addition to db, navigate to create profile
              console.log("finally block") 
              if (this.state.matches.length === 0) {
                   this.setState({likedUsers: []})
                } else {
                    for (var i = 0; i < this.state.matches.length; i++) {
                        this.getUserData(this.state.matches[i], remove)
                    }
                }     
            })
      }

      getUserData(user, remove) {
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
                  console.log("REMOVE IS")
                  console.log(remove)
                  if (remove === true) {
                      let newArray = this.state.likedUsers.filter(rUser => 
                        rUser.userID === user 
                        )
                        console.log("NEW ARRAY")
                      console.log(newArray)
                      this.setState({ likedUsers: newArray})
                  } else {
                    this.setState({ likedUsers: [...this.state.likedUsers, data.result[0]] })
                  }
                } else {console.log("ERROR")
            console.log(data)}
            })
            .catch((error) => console.error(error))
            .finally(() => {
                console.log("finally block") 
            })
      }

      async getToken() {
        try {
            console.log("before getting item");
          let userId = await AsyncStorage.getItem("user");
          console.log(userId)
          this.setState({user: userId, likedUsers: []})
          this.getAllMatches(this.state.user, false)
        } catch (error) {
          console.log("Something went wrong", error);
        }
        this.setState({userLoaded: true})
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

      setModalVisible(user) {
        console.log("set modal visible")
        this.getUserInterests(user)
      }

      closeModal(user) {
        console.log("closing modal")
        this.setState({ 
          modalVisible: !this.state.modalVisible, });
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
                    <HeaderText>connections</HeaderText>
                    <Subtitle>here are all your connections!</Subtitle>
                    {console.log(this.state.matches)}
                    {console.log(this.state.likedUsers)}
                </HeaderContainer>
                {this.state.matches.length === 0 ? 
                <AllUsersList>
                <Subtitle>you have no connections ... yet! check back occasionally!</Subtitle>
                </AllUsersList>
                :
                <AllUsersList>
                   {this.state.likedUsers.map((user, index) => {
                       return  (
                        <ProfileCard 
                            setModalVisible={this.setModalVisible}
                            user={user}
                            key={index}
                            likeUser={this.likeUser}
                            isLiked={true}/> 
                       ) 
                    })}
                </AllUsersList>
                }
                
                
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

export default connect(mapStateToProps, {pickTheme})(Connections);




