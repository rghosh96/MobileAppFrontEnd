import React, { Component } from 'react';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Subtitle, HeaderText, Button, ButtonText, Line } from '../../theming/masterStyle'
import { BioInput, SectionArea, SingleLineInput, FormArea, CreateProfileContent, ErrorText, H1, H2,
    HeaderContainer, ExpText } from '../../theming/createStyle'
import { Formik } from 'formik'
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select';
import { Alert, StyleSheet } from "react-native";
import {CLOUD_NAME, CLOUD_PRESET, CLOUD_BASE_API} from "@env"
import ImagePickerExample from '../ImagePicker';
import CheckBox from '@react-native-community/checkbox';


console.log(CLOUD_NAME)
// form validation
const UserInfoSchema = yup.object({
    gender: yup.string().required('required!!!'), 
    research: yup.string().required('required!!!'),
    hometown: yup.string().required('required!!!'),
    sendMessages: yup.bool().required('required!!!')
})

class GetUserInfo extends Component {
    constructor(props) {
        super(props)
        console.log("IN GET USER INFO CONSTRUCTOR")
    }

    state = {
        user: this.props.route.params.user,
        success: false,
        bio: '', 
        gender: '', 
        hometown: '',
        imageURI: '',
        cloudinaryURL: null,
        sendMessages: false,
        research: ''    // for faculty only
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
            hometown: info.hometown,
            research: info.research,
            sendMessages: info.sendMessages
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
                    userABOUT: this.state.bio,
                    userGENDER: this.state.gender,
                    userPROFILEPIC: this.state.cloudinaryURL,
                    userRESEARCH: this.state.research,
                    userMSG_TEACHER: this.state.sendMessages
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
                                hometown: '',
                                research: '',
                                sendMessages: false
                            }}
                            // validationSchema={SignUpSchema}
                            onSubmit={(values) => {
                                console.log(values)
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
                                    <Line/>
                                    <H1>first, some general info.</H1>
                                    <H2>Set a profile image!</H2>
                                        <ImagePickerExample setImageURI={this.setImageURI}/>
                              
                                        
                                    <Line/>
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
                                    <RNPickerSelect
                                        placeholder={{ label: 'i identify as ... ▽', value: null}}
                                        onValueChange={(value) => props.setFieldValue('gender', value)}
                                        items={[
                                            {label: 'cis woman', value: 'cis woman'},
                                            {label: 'cis man', value: 'cis man'},
                                            {label: 'trans woman', value: 'trans woman'},
                                            {label: 'trans man', value: 'trans man'},
                                            {label: 'non-binary', value: 'non-binary'},
                                            {label: 'gender fluid', value: 'gender fluid'},
                                            {label: 'gender neutral', value: 'gender neutral'},
                                            {label: 'prefer not to say', value: 'prefer not to say'},
                                            {label: 'other', value: 'other'},
                                        ]}
                                        style={dropdown(this.props)}
                                    />

                                    <SectionArea>
                                    <H2>tell us about ur research interests!</H2>
                                    <ErrorText>{props.touched.research && props.errors.research }</ErrorText>
                                    </SectionArea>
                                    <BioInput 
                                        placeholder='please describe your research! (250 words max)' 
                                        onChangeText={props.handleChange('research')} 
                                        color={this.props.theme.PRIMARY_COLOR}
                                        maxLength={150}
                                        multiline
                                        numberOfLines={7}
                                        value = {props.values.research}
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

                                    <H2>would u like students to be able to message you?</H2>
                                    <CheckBox
                                    disabled={false}
                                    value={props.values.sendMessages}
                                    onValueChange={props.handleChange('sendMessages')}
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




