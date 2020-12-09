import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import LottieView from 'lottie-react-native';
import { pickTheme } from '../../redux/actions'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal';
import ProfileModal from '../ProfileModal'
import ProfileCard from '../ProfileCard'
import { ModalContainer } from '../../theming/settingStyle'
import { AllUsersList, FilterContainer, ModalSubtitle, ModalTitle } from '../../theming/exploreStyle'
import { HeaderText, Subtitle, Container, Text, HeaderContainer } from '../../theming/masterStyle'
import RNPickerSelect from 'react-native-picker-select';
import { Alert, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';

  export const FilterModal = (props) => {
    console.log(props)
    console.log(useSelector)
    const [fashionFilter, setFashionFilter] = React.useState(null)
    const [foodFilter, setFoodFilter] = React.useState(null)
    const [gameFilter, setGameFilter] = React.useState(null)
    const [musicFilter, setMusicFilter] = React.useState(null)
    const [outFilter, setOutFilter] = React.useState(null)
    const [readFilter, setReadFilter] = React.useState(null)
    const lightGrey = useSelector(state => state.themeReducer.theme.LIGHT_GREY);
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    return (
        <ModalView>
            <Title style={{textAlign: 'center'}}>filter</Title>
            <Subtitle>fashion {fashionFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 20}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setFashionFilter(value)}
                onSlidingComplete={(value) => props.updateState("fashionFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />

            <Subtitle>food {foodFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setFoodFilter(value)}
                onSlidingComplete={(value) => props.updateState("foodFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />

            <Subtitle>gaming {gameFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setGameFilter(value)}
                onSlidingComplete={(value) => props.updateState("gameFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />  

            <Subtitle>outdoors {outFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setOutFilter(value)}
                onSlidingComplete={(value) => props.updateState("outFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />

            <Subtitle>music {musicFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setMusicFilter(value)}
                onSlidingComplete={(value) => props.updateState("musicFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />

            <Subtitle>reading {readFilter}/5</Subtitle>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={5}
                step={1}
                onValueChange={(value) => setReadFilter(value)}
                onSlidingComplete={(value) => props.updateState("readFilter", value)}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={lightGrey}
            />      

            <Button onPress={() => { props.filterUsers() }} >
                <ButtonText>Filter!</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
        </ModalView>
    )
}

export default FilterModal










