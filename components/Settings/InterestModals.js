import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import CustomRatings from '../CustomRatings'
import LottieView from 'lottie-react-native';
import { Subtitle, Line } from '../../theming/masterStyle'



  export const InterestModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    return (
        <ModalView>
            <Title style={{textAlign: 'center'}}>update {props.title}</Title>
            <Subtitle>edit your rating:</Subtitle>
            <CustomRatings 
                infoType={props.ratingType}
                updateState={props.updateState}
                rating={props.rating} 
                icon={props.icon}
                readOnly={false}
            />
            <Line/>
            <Subtitle>edit your comment:</Subtitle>
            <BioInput 
                defaultValue={props.comment} 
                placeholderTextColor={lightGrey}
                onChangeText={(input) => props.updateState(props.commentType, input)}
                maxLength={150}
                multiline
            />

            <Button onPress={() => { props.updateInterests(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}










