import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { pickTheme } from './redux/actions'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore/Explore';
import Chat from './components/Chat/Chat';
import ChatList from './components/Chat/ChatList';
import Connections from './components/Connections';
import Settings from './components/Settings/Settings';
import ProfileSettings from './components/Settings/ProfileSettings';
import InterestSettings from './components/Settings/InterestSettings';
import ThemeSettings from './components/Settings/ThemeSettings';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './components/SigningUp/SignUp'
import FirstLaunch from './components/FirstLaunch'
import GetUserInterests from './components/SigningUp/GetUserInterests'
import GetFacultyInfo from './components/SigningUp/GetFacultyInfo'
import GetUserInfo from './components/SigningUp/GetUserInfo'
import AsyncStorage from '@react-native-community/async-storage'

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
            <DashboardStack.Screen name="GetFacultyInfo" component = {GetFacultyInfo} />
            <DashboardStack.Screen name="Chat" component = {Chat} /> 
            <DashboardStack.Screen name="ProfileSettings" component = {ProfileSettings} /> 
            <DashboardStack.Screen name="InterestSettings" component = {InterestSettings} /> 
            <DashboardStack.Screen name="ThemeSettings" component = {ThemeSettings} /> 
        </DashboardStack.Navigator>
    </NavigationContainer>
)

// displays dashboard otherwise
export const Navigation = () => (
    <NavigationContainer>
        <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
            <DashboardStack.Screen name="Dashboard" component = {TabNavigation} />
            <DashboardStack.Screen name="SignUp" component = {SignUp} /> 
            <DashboardStack.Screen name="IndivChat" component = {Chat} /> 
            <DashboardStack.Screen name="ProfileSettings" component = {ProfileSettings} /> 
            <DashboardStack.Screen name="InterestSettings" component = {InterestSettings} /> 
            <DashboardStack.Screen name="ThemeSettings" component = {ThemeSettings} /> 
            <DashboardStack.Screen name="GetUserInterests" component = {GetUserInterests} />
            <DashboardStack.Screen name="GetUserInfo" component = {GetUserInfo} />
            <DashboardStack.Screen name="GetFacultyInfo" component = {GetFacultyInfo} />
        </DashboardStack.Navigator>
    </NavigationContainer>
)

// displays dashboard otherwise
export const ReturningUser = () => (
    <NavigationContainer>
        <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
            <DashboardStack.Screen name="SignUp" component = {SignUp} /> 
            <DashboardStack.Screen name="Dashboard" component = {TabNavigation} />
            <DashboardStack.Screen name="IndivChat" component = {Chat} /> 
            <DashboardStack.Screen name="ProfileSettings" component = {ProfileSettings} /> 
            <DashboardStack.Screen name="InterestSettings" component = {InterestSettings} /> 
            <DashboardStack.Screen name="ThemeSettings" component = {ThemeSettings} /> 
            <DashboardStack.Screen name="GetUserInterests" component = {GetUserInterests} />
            <DashboardStack.Screen name="GetUserInfo" component = {GetUserInfo} />
            <DashboardStack.Screen name="GetFacultyInfo" component = {GetFacultyInfo} />
        </DashboardStack.Navigator>
    </NavigationContainer>
)


const TabNavigation = () => {
    console.log(useSelector)
    const primary = useSelector(state => state.themeReducer.theme.PRIMARY_COLOR);
    const bg = useSelector(state => state.themeReducer.theme.BG_COLOR);
    const dispatch = useDispatch()
    console.log("BG")
    console.log(bg)

    React.useEffect(() => {
        AsyncStorage.getItem('theme').then(value => {
            let savedTheme = JSON.parse(value)
            console.log("IN NAVIGATION!")
          console.log(savedTheme)
          dispatch(pickTheme(savedTheme))
        })
      }, []);
    
    return(
        <Tab.Navigator 
            initialRouteName="Dashboard"
            activeColor="#f0edf6"
            style={{backgroundColor: bg}}
            labeled={true}
            barStyle={{ 
                backgroundColor: primary, 
                borderRadius: 30,
                overflow: 'hidden',
                padding: 5,
                marginBottom: 25,
                marginLeft: 15,
                marginRight: 15,
                flex: .07,
            }}>
        <Tab.Screen             
            name="Home"
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
            component={ChatList}
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
