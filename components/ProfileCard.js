import React from 'react';
import { useSelector } from 'react-redux';
import { CardContainer, ProfileImage, InfoSection,
    Subtitle, Title  } from '../theming/exploreStyle'
import LikeButton from './Explore/LikeButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'



const ProfileCard = (props) => {
    console.log("IN PROFILE CARD")
    console.log(props.isLiked)
    console.log(useSelector)
    const icon = props.isLiked ? "heart" : "heart-outline"
    const bg = useSelector(state => state.themeReducer.theme.BG_COLOR);
    const imageURI = props.user.userPROFILEPIC != null ? props.user.userPROFILEPIC : ""
    return (
        <CardContainer>
            <ProfileImage  
            source={imageURI.length!=0?{uri: imageURI}: null} />

            <InfoSection>
                <Title onPress={() => { props.setModalVisible(props.user); }}>
                    {props.user.userFNAME} {props.user.userLNAME}</Title>
                <Subtitle>{props.user.userGRADE_LEVEL}</Subtitle>
                <Subtitle>{props.user.userMAJOR}</Subtitle>
            </InfoSection>

            <MaterialCommunityIcons 
                name={icon}
                color={ bg}
                size={41}
                onPress={props.isLiked ? () => props.likeUser(props.user.userID, "no") : () => props.likeUser(props.user.userID, "yes")} />

        </CardContainer>
        
    )
}

export default ProfileCard










