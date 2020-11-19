import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Text, HeaderContainer, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { Rating } from 'react-native-elements';
import { BioInput, TextInput, CommentInput, FormArea, CreateProfileContent, RatingContainer, ErrorText, H1 } from '../../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';


// TO DO: ASK FOR INTERESTS FIRST
// THEN EXTRA BIO GENDER HOMETOWN ETC 
// form validation
const SignUpSchema = yup.object({
    user: yup.string().required('required!!!'),
    password: yup.string().required('required!!!')
})

class GetUserInfo extends Component {
    state = {
        bio: '',
        fashionRating: 0,
        foodRating: 0,
        gameRating: 0,
        outRating: 0,
        readRating: 0
      }

  render() {
      console.log(this.state)
    return (
        <ThemeProvider theme={ this.props.theme }>
            
            <CreateProfileContent>   
                        <Formik 
                            initialValues={{ 
                                bio: '', 
                                gender: '', 
                                fashionComment: '',
                                foodComment: '',
                                gamingComment: '',
                                outdoorComment: '',
                                readingComment: '' }}
                            // validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                console.log(values)
                            }}
                        >
                            {/* get access to props of Formik */}
                            {(props) => (
                                <FormArea>
                                    <HeaderContainer>
                                        <HeaderText>real quick..</HeaderText>
                                        <Subtitle>tell us a bit about yourself! create your profile.
                                        </Subtitle>
                                    </HeaderContainer>
                                    <H1>tell us a little bit about yourself.
                                    </H1>
                                    <BioInput 
                                        placeholder='please enter a short bio! (250 words max)' 
                                        onChangeText={props.handleChange('bio')} 
                                        maxLength={150}
                                        multiline
                                        numberOfLines={7}
                                        value = {props.values.bio}
                                    />
                                    <ErrorText>{props.touched.bio && props.errors.bio }</ErrorText>

                                    <H1>what is your gender identity?</H1>
                                    <TextInput 
                                        placeholder='please tell us your gender!' 
                                        onChangeText={props.handleChange('gender')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.gender}
                                    />
                                    <ErrorText>{props.touched.gender && props.errors.gender }</ErrorText>
                                    
                                    <Button title="Submit" onPress={() => props.handleSubmit()}>
                                        <ButtonText>i'm done!</ButtonText>
                                    </Button>
                                </FormArea>
                            )}
                        </Formik>
                    
                </CreateProfileContent>

        </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps, {pickTheme})(GetUserInfo);




