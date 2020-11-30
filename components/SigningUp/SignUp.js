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

// form validation
const SignUpSchema = yup.object({
    user: yup.string().required('required!!!'),
    password: yup.string().required('required!!!')
})

class SignUp extends Component {
    state = {
        loaded: false,
        success: false,
        error: '',
        alreadyInDB: false
      }

      async getToken(user) {
        try {
            console.log("before getting item");
          let userId = await AsyncStorage.getItem("user");
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
                console.log(data)
                this.setState({error: data.result})
                // if there was no error, and user was successfully added, success!
                if (data.isError === false && data.result.includes("was added")) {
                    this.setState({success: true})
                } else if (data.result.includes("already in db")) {
                    this.setState({success: true, alreadyInDB: true})
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
                            "Dashboard",
                            {user: info.user.toLowerCase()});
                     } else {
                    this.props.navigation.navigate(
                        "GetUserInterests",
                        {user: info.user.toLowerCase()});
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
                                        onChangeText={props.handleChange('user')} 
                                        value = {props.values.user}
                                    />
                                    <ErrorText>{props.touched.user && props.errors.user }</ErrorText>
                                    <FormInput 
                                        placeholder='UARK password' 
                                        onChangeText={props.handleChange('password')} 
                                        value = {props.values.password}
                                        secureTextEntry
                                    />
                                    <ErrorText>{props.touched.password && props.errors.password }</ErrorText>
                                    <Button title="Submit" onPress={() => props.handleSubmit()}>
                                        <ButtonText>get started!</ButtonText>
                                    </Button>
                                </FormArea>
                            )}
                        </Formik>
                </SignUpContent>
                </KeyboardAwareScrollView>
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




