import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Chat from './components/Chat';
import Connections from './components/Connections';
import Settings from './components/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './components/SigningUp/SignUp'
import FirstLaunch from './components/FirstLaunch'
import GetUserInterests from './components/SigningUp/GetUserInterests'
import GetUserInfo from './components/SigningUp/GetUserInfo'

const Tab = createMaterialBottomTabNavigator();
const DashboardStack = createStackNavigator();


// displays onboarding on first launch
export const FirstNav = () => (
    <NavigationContainer>
        <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
            <DashboardStack.Screen name="FirstLaunch" component = {FirstLaunch} />
            <DashboardStack.Screen name="Dashboard" component = {TabNavigation} />
            <DashboardStack.Screen name="SignUp" component = {SignUp} /> 
            <DashboardStack.Screen name="GetUserInterests" component = {GetUserInterests} />
            <DashboardStack.Screen name="GetUserInfo" component = {GetUserInfo} />
        </DashboardStack.Navigator>
    </NavigationContainer>
)

// displays dashboard otherwise
export const Navigation = () => (
    <NavigationContainer>
        <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
            <DashboardStack.Screen name="Dashboard" component = {TabNavigation} />
        </DashboardStack.Navigator>
    </NavigationContainer>
)


const TabNavigation = () => {
    console.log(useSelector)
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    const bg = useSelector(state => state.themeReducer.theme.BG_COLOR);
    
    return(
        <Tab.Navigator 
            initialRouteName="Dashboard"
            activeColor="#f0edf6"
            labeled={false}
            style={{backgroundColor: bg}}
            barStyle={{ 
                backgroundColor: primary, 
                borderRadius: 30,
                overflow: 'hidden',
                padding: 5,
                marginBottom: 25,
                marginLeft: 15,
                marginRight: 15,
                flex: .07
            }}>
        <Tab.Screen             
            name="Dashboard"
            component={Dashboard}
            options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26}/>
            ),
            }}  />
        <Tab.Screen 
            name="Explore"
            component={Explore}
            options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-search" color={color} size={26}/>
            ),
            }}
        />
        <Tab.Screen 
            name="Chat"
            component={Chat}
            options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chat" color={color} size={26}/>
            ),
            }}
        />
        <Tab.Screen 
            name="Connections"
            component={Connections}
            options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen 
            name="Settings"
            component={Settings}
            options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="settings" color={color} size={26}/>
            ),
            }}
        />
        </Tab.Navigator>
    )

}
