import React from 'react';
import { pickTheme } from '../../redux/actions'
import { pinkTheme, lavenderTheme, oliveTheme } from '../../theming/themes'
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import {  ModalView, SelectedTheme, Title, ModalOptions} from '../../theming/settingStyle'
import AsyncStorage from '@react-native-community/async-storage'

  export const DarkThemeModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const dispatch = useDispatch()
    const mode = useSelector(state => state.themeReducer.theme.mode);


    function selectTheme(theme)  {
      console.log("IN SELECT THEME")
      console.log(theme)
      dispatch(pickTheme(theme))
      setAsyncTheme(theme)
    }

    const setAsyncTheme = async (theme) => {
      try {
        console.log("IN ASYNC THEME")
      console.log(theme)
        await AsyncStorage.setItem("theme", JSON.stringify(theme))
        console.log('Data successfully saved')
      } catch (e) {
        console.log('Failed to save the data to the storage')
      }
    }

    return (
        <ModalView>
            <Title>Dark Themes</Title>
            {mode === "pink" ? <SelectedTheme onPress={() => selectTheme(pinkTheme)}>Salmon Theme</SelectedTheme> : 
              <ModalOptions onPress={() =>selectTheme(pinkTheme)}>Salmon Theme</ModalOptions>}
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

    function selectTheme(theme)  {
      console.log("IN SELECT THEME")
      console.log(theme)
      dispatch(pickTheme(theme))
      setAsyncTheme(theme)
    }

    const setAsyncTheme = async (theme) => {
      try {
        console.log("IN ASYNC THEME")
      console.log(theme)
        await AsyncStorage.setItem("theme", JSON.stringify(theme))
        console.log('Data successfully saved')
      } catch (e) {
        console.log('Failed to save the data to the storage')
      }
    }

    return (
        <ModalView>
            <Title>Light Themes</Title>
            {mode === "olive" ? <SelectedTheme onPress={() =>selectTheme(oliveTheme)}>Olive Theme</SelectedTheme> : 
            <ModalOptions onPress={() =>selectTheme(oliveTheme)}>Olive Theme</ModalOptions>}
            {mode === "lavender" ? <SelectedTheme onPress={() =>selectTheme(lavenderTheme)}>Lavender Theme</SelectedTheme> : 
            <ModalOptions onPress={() =>selectTheme(lavenderTheme)}>Lavender Theme</ModalOptions>}
    
            <Button onPress={() => { props.closeModal() }} >
            <ButtonText>Done</ButtonText>
            </Button> 
        </ModalView>
    )
}









