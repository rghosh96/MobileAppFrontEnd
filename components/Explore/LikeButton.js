import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';

const LikeButton = (props) => {
    const type = props.type 
    return (
            <MaterialCommunityIcons 
                name={type}
                color={ props.bg}
                size={41}
                onPress={props.likeUser(props.userID, "yes")} />
        
    )
}

export default LikeButton










