import React from 'react';
import { useSelector } from 'react-redux';
import { CardContainer, ProfileImage, InfoSection,
    Subtitle, Title  } from '../../theming/exploreStyle'
import LikeButton from './LikeButton'



const ProfileCard = (props) => {
    console.log("IN PROFILE CARD")
    console.log(props.user)
    console.log(useSelector)
    const liked = "heart"
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

            <LikeButton type={liked} bg={bg} />

        </CardContainer>
        
    )
}

export default ProfileCard










