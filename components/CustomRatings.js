import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { RatingContainer } from '../theming/ratingStyle'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const CustomRatings = (props) => {
    const theme = useSelector(state => state.themeReducer.theme);
    console.log("IN CUSTOM RATINGS")
    console.log(props.rating)

    let rating = []
    for (let i= 1; i <= 5; i++) {
        rating.push(
            <TouchableWithoutFeedback key={i} onPress={() => props.updateState(props.infoType, i)}>
                <MaterialCommunityIcons 
                name={props.icon}
                color={ i <=props.rating ? theme.PRIMARY_COLOR : theme.GREY }
                size={21} style={{marginRight: 3}} />
            </TouchableWithoutFeedback> 
        )
    }

    let readOnlyRating = []
    for (let i= 1; i <= 5; i++) {
        readOnlyRating.push(
                <MaterialCommunityIcons 
                name={props.icon}
                color={ i <=props.rating ? theme.PRIMARY_COLOR : theme.GREY }
                size={21} style={{marginRight: 3}} />
        )
    }

    return (
        <RatingContainer>
        {props.readOnly ? readOnlyRating : rating}
        </RatingContainer>
    )
}

export default CustomRatings

