import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText, Subtitle } from '../theming/masterStyle'
import { Title, Line } from '../theming/settingStyle'
import { ModalView, Header, ModalTitle, ModalSubtitle, ProfileImage, InterestsView, InterestHeader } from '../theming/exploreStyle'
import CustomRatings from './CustomRatings'
import { ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'



  const InfoModal = (props) => {
    const userInterests = props.userInterests != null ? props.userInterests : null
    console.log(useSelector)
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    return (
        <ModalView>
            <ModalTitle>{props.title}</ModalTitle>
            <ModalSubtitle >{props.body}</ModalSubtitle>
            <Line />
            <Button onPress={() => { props.closeModal(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
        </ModalView>
    )
}

export default InfoModal;












