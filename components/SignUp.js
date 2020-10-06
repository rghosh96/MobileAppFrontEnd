import React, { Component } from 'react';
import { pickTheme } from '../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { HeaderContainer, HeaderText, Subtitle, Button, ButtonText } from '../theming/masterStyle'
import { FormArea, SignUpContent, FormInput } from '../theming/signupStyle'
import { Formik } from 'formik'
import { MaterialCommunityIcons } from '@expo/vector-icons';


class SignUp extends Component {
  render() {
      console.log(this.props.theme)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <SignUpContent>      
                    <Formik 
                        initialValues={{ uarkEmail: '', uarkPassword: ''}}
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
                                <FormInput 
                                    placeholder='UARK password' 
                                    onChangeText={props.handleChange('uarkPassword')} 
                                    value = {props.values.uarkPassword}
                                    secureTextEntry
                                />
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




