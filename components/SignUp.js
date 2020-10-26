import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { HeaderContainer, HeaderText, Subtitle, Button, ButtonText } from '../theming/masterStyle'
import { FormArea, SignUpContent, FormInput, ErrorText } from '../theming/signupStyle'
import { Formik } from 'formik'
import * as yup from 'yup';

// form validation
const SignUpSchema = yup.object({
    user: yup.string().required('required!!!'),
    password: yup.string().required('required!!!')
})

class SignUp extends Component {
    state = {
        loaded: false,
        uid: ''
      }
       
    // calls api to authenticate username & password
    authenticate(info) {
        console.log("in authenticate")
        console.log(info.user)
        console.log(info.password)
        const user={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({user: info.user, password:info.password})
        }
        fetch(`http://mobile-app.ddns.uark.edu/LDAP/login`, user)
            .then((response) => response.text())
            .then((json) => {
                console.log(json)
                console.log(typeof json)
                if (json == "true") {
                    this.setState({uid: info.user})
                } else {
                    this.setState({uid: undefined})
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                console.log(this.state)
                    this.setState({loaded: true})
                    this.props.navigation.navigate("Dashboard");
            })
    }
    render() {
        const { data, loaded } = this.state;
        return (
            <ThemeProvider theme={ this.props.theme }>
                
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
                                    <HeaderContainer>
                                        <HeaderText>sign in</HeaderText>
                                        <Subtitle>what?! no sign up? nope! just sign in with your
                                            uark credentials!
                                        </Subtitle>
                                    </HeaderContainer>
                                    <FormInput 
                                        placeholder='UARK email' 
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




