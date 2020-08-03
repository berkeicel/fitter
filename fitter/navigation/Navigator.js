import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import {Text, Image, View} from 'react-native'
import { scale, moderateScale, verticalScale} from '../scale';

//import screen files from the screens folder
import AuthScreen from "../screens/AuthScreen"
import HealthTipsScreen from '../screens/HealthTipsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import WorkoutCategoryScreen from "../screens/WorkoutCategoryScreen"
import WorkoutScreen from '../screens/WorkoutScreen'
import WorkoutsDisplayScreen from '../screens/WorkoutsDisplayScreen'

const WorkoutNavigator = createStackNavigator({
    Categories: WorkoutCategoryScreen,
    WorkoutsDisplay: WorkoutsDisplayScreen,
    Workout: WorkoutScreen,
    Settings: SettingsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#030018'
        },
        headerTitleStyle: {
            fontSize: moderateScale(18),
            color: '#ff934c'
        },
    }
})

const AppNavigator = createMaterialTopTabNavigator({
    Workout: WorkoutNavigator,
    Tips: HealthTipsScreen,
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: "#030018"
        }
    }
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthScreen,
    App: AppNavigator
})

export default createAppContainer(MainNavigator)