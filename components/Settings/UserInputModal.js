import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ProfileImage, ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import ImagePickerExample from './UpdateImage'



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
                numberOfLines={7}
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



export const ProfileImageModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    return (
        <ModalView>
            <Title>update profile pic</Title>
            <ImagePickerExample setImageURI={props.setImageURI}/>
            {props.uploadingImage ? null: <Button onPress={() => { props.updateUserDB(); }} >
                <ButtonText>Done</ButtonText>
            </Button>}
            
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}










