import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, HeaderText, Button, ButtonText } from '../../theming/masterStyle'
import { BioInput, SectionArea, SingleLineInput, FormArea, CreateProfileContent, ErrorText, H1, H2,
    HeaderContainer } from '../../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select';
import { Alert, StyleSheet } from "react-native";
import {CLOUD_NAME, CLOUD_PRESET, CLOUD_BASE_API} from "@env"
import ImagePickerExample from '../ImagePicker';


console.log(CLOUD_NAME)
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
        // console.log(props.route.params.user)
    }

    state = {
        user: this.props.route.params.user,
        success: false,
        bio: '', 
        gender: '', 
        classification: '',
        major: '',
        graddate: '',
        hometown: '',
        imageURI: '',
        cloudinaryURL: null
      }

      setImageURI = (uri) => {
        this.setState({ imageURI: uri })
        console.log("just set image in getuserinfo")
        console.log(this.state)
        let cloudFile = {uri: this.state.imageURI, type: "jpg"
            , name: this.state.user}
        this.uploadToCloudinary(cloudFile);
      }

      uploadToCloudinary(photo) {
          if (this.state.imageURI !== '') {
              const data = new FormData();
              data.append('cloud_name', CLOUD_NAME)
              data.append('file', photo)
              data.append('upload_preset', CLOUD_PRESET)
              
              fetch(CLOUD_BASE_API, {
                  method: 'POST',
                  body: data
              }).then(res=>res.json()).then(data=> {
                  console.log(data)
                  console.log(data.secure_url)
                  this.setState({ cloudinaryURL: data.secure_url })
              })
          }
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
                    userGENDER: this.state.gender,
                    userPROFILEPIC: this.state.cloudinaryURL
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
                style={{ backgroundColor: this.props.theme.BG_COLOR, flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps={'handled'}
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
                                    <H2>Set a profile image!</H2>
                                        <ImagePickerExample setImageURI={this.setImageURI}/>
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
                                            {label: 'super senior', value: 'super senior'},
                                            {label: 'grad student', value: 'grad student'},
                                        ]}
                                        style={dropdown(this.props)}
                                    />
                                    
                                    <SectionArea>
                                    <H2>what is your primary major?</H2>
                                    <ErrorText>{props.touched.major && props.errors.major }</ErrorText>
                                    </SectionArea>
                                    <RNPickerSelect
                                        onValueChange={(value) => props.setFieldValue('major', value)}
                                        items={[
                                            {label: 'computer science', value: 'computer science'},
                                            {label: 'computer engineering', value: 'computer engineering'},
                                            {label: 'mathematics', value: 'mathematics'},
                                        ]}
                                        style={dropdown(this.props)}
                                    />
                                    
                                    <SectionArea>      
                                    <H2>when do u graduate?</H2>
                                    <ErrorText>{props.touched.graddate && props.errors.graddate }</ErrorText>
                                    </SectionArea> 
                                    <RNPickerSelect
                                        onValueChange={(value) => props.setFieldValue('graddate', value)}
                                        items={[
                                            {label: 'dec 2020', value: 'dec 2020'},
                                            {label: 'may 2021', value: 'may 2021'},
                                            {label: 'dec 2021', value: 'dec 2021'},
                                            {label: 'may 2022', value: 'may 2022'},
                                            {label: 'dec 2022', value: 'dec 2022'},
                                        ]}
                                        style={dropdown(this.props)}
                                    />

                                    <H1>now tell us more about you!</H1>
                                    <SectionArea>
                                    <H2>your hometown?</H2>
                                    <ErrorText>{props.touched.hometown && props.errors.hometown }</ErrorText>
                                    </SectionArea>
                                    
                                    <SingleLineInput 
                                        placeholder='please tell us your hometown!' 
                                        placeholderTextColor={this.props.theme.LIGHT_GREY}
                                        color={this.props.theme.PRIMARY_COLOR}
                                        onChangeText={props.handleChange('hometown')} 
                                        maxLength={50}
                                        value = {props.values.hometown}
                                    />

                                    
                                    <SectionArea>
                                    <H2>what is your gender identity?</H2>
                                    <ErrorText>{props.touched.gender && props.errors.gender }</ErrorText>
                                    </SectionArea>
                                    <SingleLineInput 
                                        placeholder='please tell us your gender!' 
                                        onChangeText={props.handleChange('gender')} 
                                        placeholderTextColor={this.props.theme.LIGHT_GREY}
                                        color={this.props.theme.PRIMARY_COLOR}
                                        maxLength={50}
                                        value = {props.values.gender}
                                    />
                                    
                                    <SectionArea>
                                    <H2>finally, a short bio</H2>
                                    <ErrorText>{props.touched.bio && props.errors.bio }</ErrorText>
                                    </SectionArea>
                                    <BioInput 
                                        placeholder='please enter a short bio! (250 words max)' 
                                        onChangeText={props.handleChange('bio')} 
                                        color={this.props.theme.PRIMARY_COLOR}
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

const dropdown = (props) => StyleSheet.create({
    inputIOS: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: props.theme.LIGHT_GREY,
        color: props.theme.PRIMARY_COLOR,
        margin: 10
      },
      inputAndroid: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: props.theme.LIGHT_GREY,
        color: props.theme.PRIMARY_COLOR,
        margin: 10
      }
  });




