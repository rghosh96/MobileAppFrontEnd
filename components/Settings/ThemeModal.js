import React from 'react';
import { pickTheme } from '../../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../../theming/themes'
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import {  ModalView, SelectedTheme, Title, ModalOptions} from '../../theming/settingStyle'


  export const DarkThemeModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const dispatch = useDispatch()
    const mode = useSelector(state => state.themeReducer.theme.mode);
    return (
        <ModalView>
            <Title>Dark Themes</Title>
            {mode === "pink" ? <SelectedTheme onPress={() => dispatch(pickTheme(pinkTheme))}>Salmon Theme</SelectedTheme> : 
              <ModalOptions onPress={() => dispatch(pickTheme(pinkTheme))}>Salmon Theme</ModalOptions>}
              <Button onPress={() => props.closeModal()} >
                <ButtonText>Done</ButtonText>
              </Button>
        </ModalView>
    )
    
}

export const LightThemeModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const dispatch = useDispatch()
    const mode = useSelector(state => state.themeReducer.theme.mode);
    return (
        <ModalView>
            <Title>Light Themes</Title>
            {mode === "olive" ? <SelectedTheme onPress={() => dispatch(pickTheme(oliveTheme))}>Olive Theme</SelectedTheme> : 
            <ModalOptions onPress={() => dispatch(pickTheme(oliveTheme))}>Olive Theme</ModalOptions>}
            {mode === "lavender" ? <SelectedTheme onPress={() => dispatch(pickTheme(lavenderTheme))}>Lavender Theme</SelectedTheme> : 
            <ModalOptions onPress={() => dispatch(pickTheme(lavenderTheme))}>Lavender Theme</ModalOptions>}
    
            <Button onPress={() => { props.closeModal() }} >
            <ButtonText>Done</ButtonText>
            </Button> 
        </ModalView>
    )
}









