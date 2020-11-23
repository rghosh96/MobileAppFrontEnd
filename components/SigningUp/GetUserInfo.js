import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, Text, HeaderContainer, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { BioInput, SectionArea, SingleLineInput, FormArea, CreateProfileContent, ErrorText, H1, H2 } from '../../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select';
import { Alert } from "react-native";

// form validation
const UserInfoSchema = yup.object({
    gender: yup.string().required('required!!!'), 
    classification: yup.string().required('required!!!'),
    major: yup.string().required('required!!!'),
    graddate: yup.string().required('required!!!'),
    hometown: yup.string().required('required!!!'),
})

class GetUserInfo extends Component {
    constructor(props) {
        super(props)
        console.log("IN GET USER INFO CONSTRUCTOR")
        console.log(props.route.params.user)
    }

    state = {
        user: this.props.route.params.user,
        success: false,
        bio: '', 
        gender: '', 
        classification: '',
        major: '',
        graddate: '',
        hometown: ''
      }

      setInfo(info) {
        this.setState({
            bio: info.bio, 
            gender: info.gender, 
            classification: info.classification,
            major: info.major,
            graddate: info.graddate,
            hometown: info.hometown
        })
        console.log(this.state)
        this.updateUserDB()
    }

    updateUserDB() {
        const updatedUser={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                userID: this.state.user, 
                values: {
                    userHOMETOWN: this.state.hometown,
                    userMAJOR: this.state.major,
                    userGRAD_DATE: this.state.graddate,
                    userGRADE_LEVEL: this.state.classification,
                    userABOUT: this.state.bio,
                    userGENDER: this.state.gender
                }
            })
        }
        console.log(updatedUser)
        // call api endpoint, sending in user to add to db
        fetch(`http://mobile-app.ddns.uark.edu/CRUDapis/users/updateUser`, updatedUser)
            .then((response) => response.text())
            .then((json) => {
                // parse the response & extract data
                let data = JSON.parse(json)
                console.log(data)
                if (data.isError === false) {
                    this.setState({success: true})
                } else {
                    this.setState({success: false})
                }
                
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (this.state.success === true) {
                    this.props.navigation.navigate(
                        "Dashboard")
                } else {
                    Alert.alert(
                        "Hmmm...",
                        "there was an error, please try again ):",
                        [
                          { text: "okie", onPress: () => console.log("okay pressed") }
                        ],
                        { cancelable: false }
                      );
                }  
            })
    }


  render() {
      console.log(this.state)
    return (
        <ThemeProvider theme={ this.props.theme }>
            <KeyboardAwareScrollView
                style={{ backgroundColor: this.props.theme.BG_COLOR }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                >
            <CreateProfileContent>   
                        <Formik 
                            validationSchema={UserInfoSchema}
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
                                this.setInfo(values)
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
                                    <SectionArea>
                                    <H2>what is your classification?</H2>
                                    <ErrorText>{props.touched.classification && props.errors.classification }</ErrorText>
                                    </SectionArea>
                                    <RNPickerSelect
                                        onValueChange={(value) => props.setFieldValue('classification', value)}
                                        items={[
                                            {label: 'freshman', value: 'freshman'},
                                            {label: 'sophomore', value: 'sophomore'},
                                            {label: 'junior', value: 'junior'},
                                            {label: 'senior', value: 'senior'},
                                            {label: 'super senior', value: 'supsen'},
                                            {label: 'grad student', value: 'grad'},
                                        ]}
                                        style={{inputIOS: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          },
                                          inputAndroid: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          }, }}
                                    />
                                    
                                    <SectionArea>
                                    <H2>what is your primary major?</H2>
                                    <ErrorText>{props.touched.major && props.errors.major }</ErrorText>
                                    </SectionArea>
                                    <RNPickerSelect
                                        onValueChange={(value) => props.setFieldValue('major', value)}
                                        items={[
                                            {label: 'computer science', value: 'cs'},
                                            {label: 'computer engineering', value: 'ce'},
                                            {label: 'math', value: 'math'},
                                        ]}
                                        style={{inputIOS: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          },
                                          inputAndroid: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          }, }}
                                    />
                                    
                                    <SectionArea>      
                                    <H2>when do u graduate?</H2>
                                    <ErrorText>{props.touched.graddate && props.errors.graddate }</ErrorText>
                                    </SectionArea> 
                                    <RNPickerSelect
                                        onValueChange={(value) => props.setFieldValue('graddate', value)}
                                        items={[
                                            {label: 'dec 2020', value: 'dec20'},
                                            {label: 'may 2021', value: 'may21'},
                                            {label: 'dec 2021', value: 'dec21'},
                                            {label: 'may 2022', value: 'may22'},
                                            {label: 'dec 2022', value: 'dec22'},
                                        ]}
                                        style={{inputIOS: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          },
                                          inputAndroid: {
                                            padding: 10,
                                            fontWeight: 'bold',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: this.props.theme.LIGHT_GREY,
                                            color: this.props.theme.PRIMARY_COLOR,
                                            margin: 10
                                          }, }}
                                    />

                                    <H1>now tell us more about you!</H1>
                                    <SectionArea>
                                    <H2>your hometown?</H2>
                                    <ErrorText>{props.touched.hometown && props.errors.hometown }</ErrorText>
                                    </SectionArea>
                                    
                                    <SingleLineInput 
                                        placeholder='please tell us your hometown!' 
                                        onChangeText={props.handleChange('hometown')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.hometown}
                                    />
                                    
                                    <SectionArea>
                                    <H2>what is your gender identity?</H2>
                                    <ErrorText>{props.touched.gender && props.errors.gender }</ErrorText>
                                    </SectionArea>
                                    <SingleLineInput 
                                        placeholder='please tell us your gender!' 
                                        onChangeText={props.handleChange('gender')} 
                                        maxLength={50}
                                        multiline
                                        value = {props.values.gender}
                                    />
                                    
                                    <SectionArea>
                                    <H2>finally, a short bio</H2>
                                    <ErrorText>{props.touched.bio && props.errors.bio }</ErrorText>
                                    </SectionArea>
                                    <BioInput 
                                        placeholder='please enter a short bio! (250 words max)' 
                                        onChangeText={props.handleChange('bio')} 
                                        maxLength={150}
                                        multiline
                                        numberOfLines={7}
                                        value = {props.values.bio}
                                    />
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




