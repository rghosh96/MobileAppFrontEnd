import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import Modal from 'react-native-modal';
import ProfileModal from './ProfileModal'
import { ModalContainer, SubSettingHeader } from '../theming/settingStyle'
import { HeaderText, Subtitle, Container, Line, HeaderContainer } from '../theming/masterStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AllUsersList } from '../theming/exploreStyle';
import ProfileCard from './ProfileCard';

//info modal
const infoData = {
  title: "how to explore:",
  body: "tap a user's name to view their profile. tap the heart to send a match request! full heart means you've matched, half heart means you've sent the request, and empty heart means you haven't matched.",
}

class ProfCourseList extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.setModalVisible = this.setModalVisible.bind(this)
      }

    state = {
        students: this.props.route.params.students,
        courseName: this.props.route.params.courseName
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
            {console.log(this.state.students)}
            <Container>
                <HeaderContainer>
                <SubSettingHeader>
                    <MaterialCommunityIcons  name="keyboard-backspace" onPress={() => this.props.navigation.navigate('Settings')} size={49} color={this.props.theme.PRIMARY_COLOR} />
                    <HeaderText>the creaters</HeaderText>
                </SubSettingHeader>
                    <Subtitle>here are the students currently enrolled in this course:
                    </Subtitle>



                </HeaderContainer>
                <Line />

                <AllUsersList>
                {this.state.students.map((user, index) => {
                 
                  return  (
                      <ProfileCard 
                          setModalVisible={this.setModalVisible}
                          user={user}
                          key={index}
                          disabled={true}
                          /> 
                      )  
                  }) }
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

export default connect(mapStateToProps, {pickTheme})(ProfCourseList);
