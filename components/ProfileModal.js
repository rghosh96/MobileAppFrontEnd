import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText, Subtitle } from '../theming/masterStyle'
import { Title, Line } from '../theming/settingStyle'
import { ModalView, Header, ModalTitle, ModalSubtitle, ProfileImage, InterestsView, InterestHeader } from '../theming/exploreStyle'
import CustomRatings from './CustomRatings'
import { ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncImage from './AsyncImage';



  const ProfileModal = (props) => {
      console.log("IN PROFILE MODAL")
    console.log(props)
    const userInterests = props.userInterests != null ? props.userInterests : null
    console.log(useSelector)
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    let profilePic
    let cuteBird = "https://cache.desktopnexus.com/thumbseg/1268/1268204-bigthumbnail.jpg"
    props.user.userPROFILEPIC === null || props.user.userPROFILEPIC === "null" ? profilePic = cuteBird : profilePic = props.user.userPROFILEPIC
    return (
        <ModalView>
            <ScrollView style={{padding: 5}} showsVerticalScrollIndicator={false}>
                <Header>
            <AsyncImage  
            source={{ uri: profilePic }} type="profile" />
            <Title style={{textAlign: 'center'}}>{props.user.userFNAME} {props.user.userLNAME}</Title>
            <Subtitle>{props.user.userABOUT}</Subtitle>
            <Line/>
            
            
            <ModalTitle>Hometown:</ModalTitle>
            <Subtitle>{props.user.userHOMETOWN}</Subtitle>

            <ModalTitle>Programming Experience: </ModalTitle>
            {props.user.userPROGRAM_EXP == 1 ? <Subtitle>little</Subtitle> : null}
            {props.user.userPROGRAM_EXP == 2 ? <Subtitle>moderate</Subtitle> : null}
            {props.user.userPROGRAM_EXP == 3 ? <Subtitle>experienced</Subtitle> : null}

            <ModalTitle>Classes:</ModalTitle>
            <Subtitle>{props.user.userCLASSES}</Subtitle>
            <ModalTitle>Interests:</ModalTitle>
            
            <InterestsView>
            <InterestHeader>fashion ({props.userInterests.interestFASHION}/5)</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="fashionRating" 
            updateState={null}
            rating={props.userInterests.interestFASHION} 
            icon="shopping"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestFASHION_COMMENT ?
            props.userInterests.interestFASHION_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>
            
            <InterestsView>
            <InterestHeader>food ({props.userInterests.interestFOOD}/5)</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="foodRating" 
            updateState={null}
            rating={props.userInterests.interestFOOD} 
            icon="food-apple"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestFOOD_COMMENT ?
            props.userInterests.interestFOOD_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>

            <InterestsView>
            <InterestHeader>gaming ({props.userInterests.interestGAMING}/5)</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="gamingRating" 
            updateState={null}
            rating={props.userInterests.interestGAMING} 
            icon="gamepad-variant"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestGAMING_COMMENT ?
            props.userInterests.interestGAMING_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>

            <InterestsView>
            <InterestHeader>outdoors ({props.userInterests.interestOUTDOORS}/5)</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="outRating" 
            updateState={null}
            rating={props.userInterests.interestOUTDOORS} 
            icon="pine-tree"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestOUTDOORS_COMMENT ?
            props.userInterests.interestOUTDOORS_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>

            <InterestsView>
            <InterestHeader>music ({props.userInterests.interestMUSIC}/5)</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="musicRating" 
            updateState={null}
            rating={props.userInterests.interestMUSIC} 
            icon="music-note"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestMUSIC_COMMENT ?
            props.userInterests.interestMUSIC_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>

            <InterestsView>
            <InterestHeader>reading interest:</InterestHeader>
            {userInterests != null ? 
            <CustomRatings 
            infoType="readRating" 
            updateState={null}
            rating={props.userInterests.interestREADING} 
            icon="book"
            readOnly={true}/> : null}
            <ModalSubtitle>{props.userInterests.interestREADING_COMMENT ?
            props.userInterests.interestREADING_COMMENT : "--"}</ModalSubtitle>
            </InterestsView>
            <Line />
            <Button onPress={() => { props.closeModal(); }} >
                <ButtonText>Done</ButtonText>
            </Button>
            </Header>
            </ScrollView>
        </ModalView>
    )
}

export default ProfileModal;












