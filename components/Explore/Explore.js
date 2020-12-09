import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal';
import ProfileModal from '../ProfileModal'
import ProfileCard from '../ProfileCard'
import { ModalContainer } from '../../theming/settingStyle'
import { AllUsersList, FilterContainer, ModalSubtitle, ModalTitle } from '../../theming/exploreStyle'
import { HeaderText, Subtitle, Container, Line, HeaderContainer, DescriptionArea } from '../../theming/masterStyle'
import { Button, ButtonText } from '../../theming/masterStyle'
import { Alert, StyleSheet } from "react-native";
import FilterModal from './FilterModal'
import InfoModal from '../InfoModal';
import { MaterialCommunityIcons } from '@expo/vector-icons'

//info modal
const infoData = {
  title: "how to explore:",
  body: "tap a user's name to view their profile. tap the heart to send a match request! full heart means you've matched, half heart means you've sent the request, and empty heart means you haven't matched.",
}

class Explore extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
        this.likeUser = this.likeUser.bind(this)
        this.updateState = this.updateState.bind(this)
        this.filterUsers = this.filterUsers.bind(this)
      }

    state = {
        listResults: true,
        user: '',
        allUsers: [],
        modalContent: '',
        modalVisible: false,
        modalUser: null,
        userInterests: null,
        matches: [],
        halfHeartGang: [],
        hometownFilter: null,
        majorFilter: null,
        gradDateFilter: null,
        classificationFilter: null,
        genderFilter: null,
        expFilter: null,
        statusFilter: null,
        fashionFilter: null,
        foodFilter: null,
        gameFilter: null,
        outFilter: null,
        musicFilter: null,
        readFilter: null
    }

    updateState = (attribute, data) => {
      console.log("trynna update state")
      console.log(attribute)
      console.log(data)
      this.setState({
        [attribute]: data
      })
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
                    this.setState({ allUsers: data.result, loaded: true })
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
              console.log("finally block") 
            })
      }

      filterUsers() {
        this.setState({loaded: false})
        const filterList = {
          userHOMETOWN: this.state.hometownFilter,
          userMAJOR: this.state.majorFilter,
          userGRAD_DATE: this.state.gradDateFilter,
          userGRADE_LEVEL: this.state.classificationFilter,
          userGENDER: this.state.genderFilter,
          userPROGRAM_EXP: this.state.expFilter,
          userSTATUS: this.state.statusFilter,
          interestFASHION: this.state.fashionFilter,
          interestFOOD: this.state.foodFilter,
          interestGAMING: this.state.gameFilter,
          interestOUTDOORS: this.state.outFilter,
          interestMUSIC: this.state.musicFilter,
          interestREADING: this.state.readFilter
        }
        const filterBody = {}
        console.log("INSIDE FILTER")
        for (let [key, value] of Object.entries(filterList)) {
          if(value != null) {
            console.log(key + ": " + value);
            filterBody[key] = value
          }
          
        }
        console.log("BODY FOR JSON:")
        console.log(filterBody)
      
      // console.log(filterList)
        const filterOptions={
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(filterBody)
      }
        var data;
        // call api endpoint, sending in user to add to db
        fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/matches/filter`, filterOptions)
            .then((response) => response.text())
            .then((json) => {
              // parse the response & extract data
              data = JSON.parse(json)
              console.log(data)
              
            })
            .catch((error) => console.error(error))
            .finally(() => {
              console.log("finally block") 
              let results
              data.result === "no matches, empty array" ? results = false : results = data.result
              this.setState({allUsers: results, modalVisible: false,
                hometownFilter: null,
                majorFilter: null,
                gradDateFilter: null,
                classificationFilter: null,
                genderFilter: null,
                expFilter: null,
                statusFilter: null,
                fashionFilter: null,
                foodFilter: null,
                gameFilter: null,
                outFilter: null,
                musicFilter: null,
                readFilter: null})
            })
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

    setModalVisible(user, modalView) {
      if (modalView === "InfoModal") {
        this.setState({ 
          modalVisible: true,
          modalContent: "InfoModal" })
      } else if (modalView === "FilterModal") {
        this.setState({ modalVisible: true, modalContent: "FilterModal"})
      } else {
        this.getUserInterests(user)
      }
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

          case "FilterModal":
            modalDisplay = <FilterModal 
            closeModal={this.closeModal}
            updateState={this.updateState}
            filterUsers={this.filterUsers}/>
            break;
          
          case "InfoModal":
            modalDisplay= <InfoModal
            closeModal={this.closeModal} 
            title={infoData.title} 
            body={infoData.body}/> 
        
          default:
            break;
        }

    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <Container>
                <HeaderContainer>
                    <HeaderText>explore</HeaderText>
                    <DescriptionArea>
                    <Subtitle>the world of csce is yours to discover!
                    </Subtitle>
                    <MaterialCommunityIcons 
                      name="comment-question-outline"
                      color={this.props.theme.PRIMARY_COLOR}
                      size={33}
                      onPress={() => this.setModalVisible(null,"InfoModal")} />
                      </DescriptionArea>
                </HeaderContainer>
                <Line />
                <FilterContainer>
                  <Button onPress={() => this.setModalVisible(null,"FilterModal")}>
                  <ButtonText>Filter ...</ButtonText>
                  </Button>
                  <Button onPress={() => this.getAllUsers()}>
                  <ButtonText>Clear Filter ...</ButtonText>
                  </Button>
                </FilterContainer>
                
                

                {this.state.allUsers !==false  ? 
                <AllUsersList>
                {this.state.allUsers.map((user, index) => {
                  let isMatched = this.state.matches.includes(user.userID)
                  let halfHeart = this.state.halfHeartGang.some((heart => heart['user'] === user.userID && heart['likeStatus'] === "yes" ))
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
                  }) }
                </AllUsersList> : <AllUsersList><Subtitle>no results :/</Subtitle></AllUsersList>}
                
                {console.log("IN VIEW")}
                {console.log(this.state.allUsers)}
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




const dropdown = (props) => StyleSheet.create({
  inputIOS: {
      padding: 10,
      fontWeight: 'bold',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: props.theme.LIGHT_GREY,
      color: props.theme.PRIMARY_COLOR,
      margin: 10
    },
    inputAndroid: {
      padding: 10,
      fontWeight: 'bold',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: props.theme.LIGHT_GREY,
      color: props.theme.PRIMARY_COLOR,
      margin: 10
    }
});