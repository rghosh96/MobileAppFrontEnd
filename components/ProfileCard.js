import React from 'react';
import { useSelector } from 'react-redux';
import { CardContainer, ProfileImage, InfoSection,
    Subtitle, Title  } from '../theming/exploreStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncImage from './AsyncImage'



const ProfileCard = (props) => {
    var likeAction;
    if (!props.isMatched && props.isLiked) { likeAction = "no" }
    if (!props.isMatched && !props.isLiked) { likeAction = "yes" }
    if (props.isMatched) { likeAction = "no" }
    const bg = useSelector(state => state.themeReducer.theme.BG_COLOR);
    let profilePic
    let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"
    props.user.userPROFILEPIC === null || props.user.userPROFILEPIC === "null" ? profilePic = cuteBird : profilePic = props.user.userPROFILEPIC
    return (
        <CardContainer>
            <AsyncImage  
            source={{uri: profilePic }} type="people" />

            {props.user.userSTATUS === "student" ?
            <InfoSection>
                <Title onPress={() => { props.setModalVisible(props.user); }}>
                    {props.user.userFNAME} {props.user.userLNAME}</Title>
                <Subtitle>{props.user.userGRADE_LEVEL}</Subtitle>
                <Subtitle>{props.user.userMAJOR}</Subtitle>
            </InfoSection> : 
            <InfoSection>
                <Title onPress={() => { props.setModalVisible(props.user); }}>
                    {props.user.userFNAME} {props.user.userLNAME}</Title>
                <Subtitle>{props.user.userSTATUS}</Subtitle>
                <Subtitle>{props.user.userMAJOR}</Subtitle>
            </InfoSection> }
            {(props.disabled === false ) ?
            <MaterialCommunityIcons 
                name={props.icon}
                color={ bg}
                size={41}
                onPress={props.isMatched ? () => props.likeUser(props.user.userID, likeAction) : () => props.likeUser(props.user.userID, likeAction)} />
        : null }
        </CardContainer>
        
    )
}

export default ProfileCard










