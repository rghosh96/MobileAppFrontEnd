import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import CustomRatings from '../CustomRatings'
import LottieView from 'lottie-react-native';



  export const InterestModal = (props) => {
    console.log(props)
    return (
        <ModalView>
            <Title style={{textAlign: 'center'}}>update {props.title}</Title>
            <CustomRatings 
                infoType={props.ratingType}
                updateState={props.updateState}
                rating={props.rating} 
                icon={props.icon}
                readOnly={false}
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










