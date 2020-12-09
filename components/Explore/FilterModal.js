import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonText } from '../../theming/masterStyle'
import { ModalView, Title, FormInput, BioInput } from '../../theming/settingStyle'
import { HeaderText, Subtitle, Container, Text, HeaderContainer } from '../../theming/masterStyle'
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView, StyleSheet } from "react-native";
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
            <ScrollView showsVerticalScrollIndicator={false}>
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

            <Subtitle>classification</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select... ▽', value: null}}
                onValueChange={(value) => props.updateState("classificationFilter", value)}
                items={[
                    {label: 'freshman', value: 'freshman'},
                    {label: 'sophomore', value: 'sophomore'},
                    {label: 'junior', value: 'junior'},
                    {label: 'senior', value: 'senior'},
                    {label: 'super senior', value: 'super senior'},
                    {label: 'grad student', value: 'grad student'},
                ]}
                style={dropdown(primary, lightGrey)}
            />

            <Subtitle>gender</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select...▽', value: null}}
                onValueChange={(value) => props.updateState('genderFilter', value)}
                items={[
                    {label: 'cis woman', value: 'cis woman'},
                    {label: 'cis man', value: 'cis man'},
                    {label: 'trans woman', value: 'trans woman'},
                    {label: 'trans man', value: 'trans man'},
                    {label: 'non-binary', value: 'non-binary'},
                    {label: 'gender fluid', value: 'gender fluid'},
                    {label: 'gender neutral', value: 'gender neutral'},
                    {label: 'prefer not to say', value: 'prefer not to say'},
                    {label: 'other', value: 'other'},
                ]}
                style={dropdown(primary, lightGrey)}
            />
            
            <Subtitle>grad date</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select...▽', value: null}}
                onValueChange={(value) => props.updateState('gradDateFilter', value)}
                items={[
                    {label: 'dec 2020', value: 'dec 2020'},
                    {label: 'may 2021', value: 'may 2021'},
                    {label: 'dec 2021', value: 'dec 2021'},
                    {label: 'may 2022', value: 'may 2022'},
                    {label: 'dec 2022', value: 'dec 2022'},
                ]}
                style={dropdown(primary, lightGrey)}
            />

            <Subtitle>primary major</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select...▽', value: null}}
                onValueChange={(value) => props.updateState('majorFilter', value)}
                items={[
                    {label: 'computer science', value: 'computer science'},
                    {label: 'computer engineering', value: 'computer engineering'},
                    {label: 'mathematics', value: 'mathematics'},
                ]}
                style={dropdown(primary, lightGrey)}
            />

            <Subtitle>programming experience</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select...▽', value: null}}
                onValueChange={(value) => props.updateState('expFilter', value)}
                items={[
                    {label: 'little', value: '1'},
                    {label: 'moderate', value: '2'},
                    {label: 'a lot', value: '3'},
                ]}
                style={dropdown(primary, lightGrey)}
            />

            <Subtitle>faculty vs student</Subtitle>
            <RNPickerSelect
                placeholder={{ label: 'select...▽', value: null}}
                onValueChange={(value) => props.updateState('statusFilter', value)}
                items={[
                    {label: 'student', value: 'student'},
                    {label: 'faculty', value: 'faculty'}
                ]}
                style={dropdown(primary, lightGrey)}
            />

            <Button onPress={() => { props.filterUsers() }} >
                <ButtonText>Filter!</ButtonText>
            </Button>
            <Button onPress={() => { props.closeModal() }} >
                <ButtonText>Cancel</ButtonText>
            </Button>
            </ScrollView>
        </ModalView>
    )
}

export default FilterModal



const dropdown = (props) => StyleSheet.create({
    inputIOS: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: props.lightGrey,
        color: props.primary,
        margin: 10
      },
      inputAndroid: {
        padding: 10,
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: props.lightGrey,
        color: props.primary,
        margin: 10
      }
  });







