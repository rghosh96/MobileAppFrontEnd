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
        loading: true
      }

      likeUser(likedUser, likeAction) {
        this.setState({loading: false})
        // create user body to send to api
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
                this.getAllMatches(this.state.user) 
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
                console.log("we got set the data!")
                let interestsInfo = data.result[0]
                this.setState({ 
                  userInterests: interestsInfo,
                  modalVisible: true,
                  modalContent: "ProfileModal",
                  modalUser: user, })
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
              this.setState({ matches: data.result })
            })
            .catch((error) => console.error(error))
            .finally(() => {
                  this.getMatchObjects()  
            })
      }

      getMatchObjects() {
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
                  console.log("IN GET MATCH OBJECTS")
                  console.log(data)
                  let matches = this.state.matches
                  let matchesArray = data.result.filter(function (item) {
                    console.log("IN FILTER")
                    console.log(matches)
                    if(matches.includes(item.userID)) {
                      return item
                    }
                  });
                  console.log(matchesArray)
                  this.setState({likedUsers: matchesArray})
          })
          .catch((error) => console.error(error))
          .finally(() => {
          })
      }

      getUserData(user) {
        var data;
        let apiEndpoint = "http://mobile-app.ddns.uark.edu/CRUDapis/users/getUser?USER_id=" + user;
        // call api endpoint, sending in user to add to db
        fetch(apiEndpoint,)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                data = JSON.parse(json)
                if (data.isError === false) {
                    this.setState({ likedUsers: [...this.state.likedUsers, data.result[0]] })
                  
                } else {console.log("ERROR")
              }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                
            })
      }

      async getToken() {
        try {
          let userId = await AsyncStorage.getItem("user");
          this.setState({user: userId })
          this.getAllMatches(this.state.user)
        } catch (error) {
          console.log("Something went wrong", error);
        }
        this.setState({userLoaded: true})
        // this.setState({loading: false})
      }  

      async componentDidMount() {
        this.getToken()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getToken()
          });
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
      let userList = 
      <AllUsersList>{this.state.likedUsers.map((user, index) => {
        return  (
         <ProfileCard 
             setModalVisible={this.setModalVisible}
             user={user}
             key={index}
             likeUser={this.likeUser}
             icon="heart"
             isLiked={true}/> 
        ) 
     })}</AllUsersList>

    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
            <HeaderContainer>
                <HeaderText>connections</HeaderText>
                <Subtitle>here you can view all your current connections and their profiles.
                </Subtitle>
            </HeaderContainer>
            
              {console.log("about to render map")}
              {this.state.matches.length === this.state.likedUsers.length ? userList : null }
 
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




