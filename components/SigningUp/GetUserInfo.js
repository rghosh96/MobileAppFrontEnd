import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Text, HeaderContainer, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { Rating } from 'react-native-elements';
import { BioInput, TextInput, CommentInput, FormArea, CreateProfileContent, RatingContainer, ErrorText, H1 } from '../../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'






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
            <KeyboardAwareScrollView
                style={{ backgroundColor: this.props.theme.BG_COLOR }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                >
            <CreateProfileContent>   
                        <Formik 
                            initialValues={{ 
                                bio: '', 
                                gender: '', 
                                classification: '',
                                major: '',
                                graddate: '',
                                hometown: ''
                            }}
                            // validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                console.log(values)
                                this.props.navigation.navigate("Dashboard");
                            }}
                        >
                            {/* get access to props of Formik */}
                            {(props) => (
                                <FormArea>
                                    <HeaderContainer>
                                        <HeaderText>last step!</HeaderText>
                                        <Subtitle>you're almost done! just need some last tidbits ..
                                        </Subtitle>
                                    </HeaderContainer>
                                    <H1>first, some general info.</H1>
                                    <Subtitle>what is your classification?</Subtitle>
                                    <DropDownPicker
                                        items={[
                                            {label: 'freshman', value: 'freshman'},
                                            {label: 'sophomore', value: 'sophomore'},
                                            {label: 'junior', value: 'junior'},
                                            {label: 'senior', value: 'senior'},
                                            {label: 'super senior', value: 'supsen'},
                                            {label: 'grad student', value: 'grad'},
                                        ]}
                                        defaultValue="freshman"
                                        arrowColor= {this.props.theme.PRIMARY_COLOR}
                                        containerStyle={{height: 40, margin: 5}}
                                        style={{backgroundColor: this.props.theme.BG_COLOR }}
                                        dropDownStyle={{backgroundColor: this.props.theme.BG_COLOR}}
                                        labelStyle={{fontSize: 14, color: this.props.theme.GREY}}
                                        activeLabelStyle={{fontWeight: 'bold', color: this.props.theme.PRIMARY_COLOR}}
                                        onChangeItem={item => props.setFieldValue('classification', item.value)}
                                    />

                                    <Subtitle>what is your primary major?</Subtitle>
                                    <DropDownPicker
                                        items={[
                                            {label: 'computer science', value: 'cs'},
                                            {label: 'computer engineering', value: 'ce'},
                                            {label: 'math', value: 'math'},
                                        ]}
                                        defaultValue="cs"
                                        arrowColor= {this.props.theme.PRIMARY_COLOR}
                                        containerStyle={{height: 40, margin: 5}}
                                        style={{backgroundColor: this.props.theme.BG_COLOR }}
                                        dropDownStyle={{backgroundColor: this.props.theme.BG_COLOR}}
                                        labelStyle={{fontSize: 14, color: this.props.theme.GREY}}
                                        activeLabelStyle={{fontWeight: 'bold', color: this.props.theme.PRIMARY_COLOR}}
                                        onChangeItem={item => props.setFieldValue('major', item.value)}
                                    />

                                    <Subtitle>when do u graduate?</Subtitle>
                                    <DropDownPicker
                                        items={[
                                            {label: 'dec 2020', value: 'dec20'},
                                            {label: 'may 2021', value: 'may21'},
                                            {label: 'dec 2021', value: 'dec21'},
                                            {label: 'may 2022', value: 'may22'},
                                            {label: 'dec 2022', value: 'dec22'},
                                        ]}
                                        defaultValue="dec20"
                                        arrowColor= {this.props.theme.PRIMARY_COLOR}
                                        containerStyle={{height: 40, margin: 5}}
                                        style={{backgroundColor: this.props.theme.BG_COLOR }}
                                        dropDownStyle={{backgroundColor: this.props.theme.BG_COLOR}}
                                        labelStyle={{fontSize: 14, color: this.props.theme.GREY}}
                                        activeLabelStyle={{fontWeight: 'bold', color: this.props.theme.PRIMARY_COLOR}}
                                        onChangeItem={item => props.setFieldValue('graddate', item.value)}
                                    />

                                    <Subtitle>your hometown?</Subtitle>
                                    <TextInput 
                                        placeholder='please tell us your hometown!' 
                                        onChangeText={props.handleChange('hometown')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.hometown}
                                    />
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

export default connect(mapStateToProps, {pickTheme})(GetUserInfo);




