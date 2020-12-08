import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeProvider } from 'styled-components/native';
import { HeaderText, Subtitle, Button, ButtonText, Center } from '../../theming/masterStyle'
import { HeaderContainer } from '../../theming/createStyle'
import { FormArea, SignUpContent, FormInput, ErrorText } from '../../theming/signupStyle'
import { Formik } from 'formik'
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LottieView from 'lottie-react-native';
import { Alert } from "react-native";
import InfoModal from '../InfoModal'
import Modal from 'react-native-modal';
import { ModalContainer } from '../../theming/settingStyle'

//info modal
const infoData = {
    title: "our privacy statement",
    body: "by signing into this app, you are allowing us to pull your data from the uark database, including your name, email, and classes. your data will only be used in app, and viewable by other users, but we will NOT share it with any third parties!",
}

// form validation
const SignUpSchema = yup.object({
    user: yup.string().required('required!!!'),
    password: yup.string().required('required!!!')
})

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this)
      }

    state = {
        loaded: false,
        success: false,
        error: '',
        alreadyInDB: false,
        modalVisible: false,
        userStatus: ''
      }

      setModalVisible = (visible) => {
        this.setState({ 
          modalVisible: visible});
      }
  
      closeModal() {
        console.log("closing modal")
        this.setState({ 
          modalVisible: !this.state.modalVisible  });
      }

      async getToken(user) {
        try {
            console.log("before getting item");
          let userId = await AsyncStorage.getItem("user");
          console.log(userId)
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }  

      async storeToken(user) {
        try {
           await AsyncStorage.setItem("user", user);
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
    // calls api to authenticate username & password
    authenticate(info) {
        console.log("in authenticate")
        console.log(info)
        // create user body to send to api
        const user={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({user: info.user.toLowerCase(), password:info.password})
        }
        // call api endpoint, sending in user to add to db
        fetch(`http://mobile-app.ddns.uark.edu/LDAP/login`, user)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                let data = JSON.parse(json)
                console.log("USER IS: ")
                console.log(data)
                this.setState({error: data.result})
                // if there was no error, and user was successfully added, success!
                if (data.isError === false && data.result.includes("was added")) {
                    this.setState({success: true, userStatus: data.userStatus})
                } else if (data.result.includes("already in db")) {
                    this.setState({success: true, alreadyInDB: true, userStatus: data.userStatus})
                } else {
                    if (data.result.includes("Incorrect authentication")) {
                        this.setState({success: false})
                    }
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                // if successful addition to db, navigate to create profile
                if (this.state.success === true) {
                    this.storeToken(info.user.toLowerCase())
                     console.log("successfully stored user in async storage!")
                     this.getToken();

                     if (this.state.alreadyInDB === true) {
                        this.props.navigation.navigate(
                            "GetUserInterests",
                            {user: info.user.toLowerCase(),
                            userStatus: this.state.userStatus});
                     } else {
                    this.props.navigation.navigate(
                        "GetUserInterests",
                        {user: info.user.toLowerCase(),
                        userStatus: this.state.userStatus});
                    }
                } else {
                    Alert.alert(
                        "Hmmm...",
                        this.state.error,
                        [
                          { text: "let me double check ..", onPress: () => console.log("okay pressed") }
                        ],
                        { cancelable: false }
                      );
                }
                    
            })
    }
    render() {
        const { data, loaded } = this.state;
        return (
            <ThemeProvider theme={ this.props.theme }>
                <KeyboardAwareScrollView
                style={{ backgroundColor: this.props.theme.BG_COLOR }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                >
                <SignUpContent>     
                        <Formik 
                            initialValues={{ user: '', password: ''}}
                            validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                this.authenticate(values)
                            }}
                        >
                            {/* get access to props of Formik */}
                            {(props) => (
                                <FormArea>
                                    <Center><LottieView style={{height: 200}}source={require('../../assets/signup.json')} autoPlay loop /></Center> 
                                    <HeaderContainer>
                                        <HeaderText>sign in</HeaderText>
                                        <Subtitle>what?! no sign up? nope! just sign in with your
                                            uark credentials!
                                        </Subtitle>
                                    </HeaderContainer>
                                    <FormInput 
                                        placeholder='UARK username (do NOT include @uark.edu)' 
                                        placeholderTextColor={this.props.theme.LIGHT_GREY}
                                        onChangeText={props.handleChange('user')} 
                                        value = {props.values.user}
                                    />
                                    <ErrorText>{props.touched.user && props.errors.user }</ErrorText>
                                    <FormInput 
                                        placeholder='UARK password' 
                                        placeholderTextColor={this.props.theme.LIGHT_GREY}
                                        onChangeText={props.handleChange('password')} 
                                        value = {props.values.password}
                                        secureTextEntry
                                    />
                                    <ErrorText>{props.touched.password && props.errors.password }</ErrorText>
                                    <Subtitle onPress={() => {
                                        this.setModalVisible(true)}}>view privacy statement</Subtitle>
                                    <Button title="Submit" onPress={() => props.handleSubmit()}>
                                        <ButtonText>get started!</ButtonText>
                                    </Button>
                                </FormArea>
                            )}
                        </Formik>
                </SignUpContent>
                </KeyboardAwareScrollView>
                <Modal isVisible={this.state.modalVisible}>
                    <ModalContainer>
                    <InfoModal closeModal={this.closeModal} title={infoData.title} body={infoData.body}/>              
                </ModalContainer>
        </Modal>
            </ThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(SignUp);




