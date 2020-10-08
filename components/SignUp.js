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
    uarkEmail: yup.string().required('required!!!').email('not a valid email??!'),
    uarkPassword: yup.string().required('required!!!')
})

class SignUp extends Component {
    // state = {
    //     loaded: false,
    //     student: {
    //         user:"",
    //         password:""
    //     }
    //   }
      
    
       
    // componentDidMount() {
    //     console.log("SIGN UP!!!")
    //     const user={
    //         method: 'POST',
    //         headers:{'Content-Type': 'application/json'},
    //     //     body: JSON.stringify(student)
    //     body: JSON.stringify({user:'af027', password:"bipniq-wekmov-Qugse5"})
    // }
    
    //     const fetchUserData = async() => {
    //         const response = await fetch(`http://mobile-app.ddns.uark.edu/nodejsApp/login`, user)
    //         const student = await response.json()
    //         console.log(student);
    //         this.setState({
    //             loaded: true,
    //             student: student
    //         })
    
    //     }

    //     try {
    //         fetchUserData();
    //     } catch (e) {
    //         console.log("error !!!")
    //     }
    // }
  render() {
      console.log(this.props.theme)
      console.log("SIGN UP!!!")
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <SignUpContent>      
                    <Formik 
                        initialValues={{ user: '', password: ''}}
                        validationSchema={SignUpSchema}
                        onSubmit={(values) => {
                            console.log(values)

                            this.props.navigation.navigate("Dashboard");
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
                                    value = {props.values.uarkEmail}
                                />
                                <ErrorText>{props.touched.uarkEmail && props.errors.uarkEmail }</ErrorText>
                                <FormInput 
                                    placeholder='UARK password' 
                                    onChangeText={props.handleChange('password')} 
                                    value = {props.values.uarkPassword}
                                    secureTextEntry
                                />
                                <ErrorText>{props.touched.uarkPassword && props.errors.uarkPassword }</ErrorText>
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




