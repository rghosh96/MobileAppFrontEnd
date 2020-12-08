import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import ImagePickerExample from './UpdateImage'
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-checkbox-lite';


  export const UserInputModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    return (
        <ModalView>
            <Title>update {props.infoType}</Title>
            <FormInput 
                placeholder={props.infoType} 
                placeholderTextColor={lightGrey}
                onChangeText={(input) => props.updateState(props.infoType, input)}
            />
            <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}

export const UserDropDownModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    return (
        <ModalView>
            <Title>update {props.infoType}</Title>
            <RNPickerSelect
                onValueChange={(value) => props.updateState(props.infoType, value)}
                items={props.items}
                style={dropdown(lightGrey, primary)}
            />
            <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}

export const UserRatingModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    return (
        <ModalView>
            <Title>update {props.infoType}</Title>
            <RNPickerSelect
                onValueChange={(value) => props.updateState(props.infoType, value)}
                items={props.items}
                style={dropdown(lightGrey, primary)}
            />
            <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}

export const UserBioInputModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    return (
        <ModalView>
            <Title>update {props.infoType}</Title>
            <BioInput 
                placeholder={props.infoType} 
                placeholderTextColor={lightGrey}
                onChangeText={(input) => props.updateState(props.infoType, input)}
                maxLength={150}
                multiline
            />
            <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}

export const CheckBoxModal = (props) => {
    const [isChecked, setIsChecked] = React.useState(false)
    console.log(isChecked)
    function toggleCheckBox() {
        setIsChecked(!isChecked);
      }
    React.useEffect(() =>{
        console.log("IN USE EFFECT: " + isChecked)
        props.updateState(props.infoType, isChecked)
    },[isChecked])
    console.log(useSelector)
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    console.log("BEFORE RETURN: " + isChecked)
    return (
        <ModalView>
            <Title>update {props.infoType}</Title>
            <CheckBox 
                style={{marginTop: 15}}
                text={false}
                isChecked={isChecked} 
                onPress={() => toggleCheckBox()} 
                checkBoxColor={primary} />
            <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}





export const ProfileImageModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    return (
        <ModalView>
            <Title>update profile pic</Title>
            <ImagePickerExample setImageURI={props.setImageURI}/>
            {props.uploadingImage ? <LottieView style={{height: 65}}source={require('../../assets/uploading.json')} autoPlay loop />
            : null }
            {props.imageSet ? <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Set New Profile Image</ButtonText>
            </Button>
            : null }
            
            
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}


const dropdown = (lightGrey, primary) => StyleSheet.create({
    inputIOS: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: lightGrey,
        color: primary,
        margin: 10
      },
      inputAndroid: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: lightGrey,
        color: primary,
        margin: 10
      }
  });









