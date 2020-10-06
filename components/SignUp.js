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
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <SignUpContent>      
                    <Formik 
                        initialValues={{ uarkEmail: '', uarkPassword: ''}}
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
                                    onChangeText={props.handleChange('uarkEmail')} 
                                    value = {props.values.uarkEmail}
                                />
                                <ErrorText>{props.touched.uarkEmail && props.errors.uarkEmail }</ErrorText>
                                <FormInput 
                                    placeholder='UARK password' 
                                    onChangeText={props.handleChange('uarkPassword')} 
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




