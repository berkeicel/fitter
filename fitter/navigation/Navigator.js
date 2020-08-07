import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import {Text, Image, View} from 'react-native'
import { scale, moderateScale, verticalScale} from '../scale';
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'


//import screen files from the screens folder
import AuthScreen from "../screens/AuthScreen"
import HealthTipsScreen from '../screens/HealthTipsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import WorkoutCategoryScreen from "../screens/WorkoutCategoryScreen"
import WorkoutScreen from '../screens/WorkoutScreen'
import WorkoutsDisplayScreen from '../screens/WorkoutsDisplayScreen'
import StartUpScreen from '../screens/StartUpScreen'

const WorkoutNavigator = createStackNavigator({
    Categories: WorkoutCategoryScreen,
    WorkoutsDisplay: WorkoutsDisplayScreen,
    Workout: WorkoutScreen,
    Settings: SettingsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#030018',
            height: moderateScale(70),
        },
        headerTitleStyle: {
            fontSize: moderateScale(24),
            color: 'white',
            paddingLeft: moderateScale(10)
        },
        headerTitleAlign: 'left',
        headerBackground: () => (
            <LinearGradient
              colors={["#ff934c", "#fc686f"]}
              style={{ flex: 1 }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
        ),
        headerTintColor: 'white',
        headerBackTitleStyle: {
            fontSize: moderateScale(15),
        },
    }
})

const AppNavigator = createMaterialTopTabNavigator({
    Workout: {
        screen: WorkoutNavigator,
        navigationOptions: {
            tabBarIcon: () => (
                <View style={{alignItems: 'center'}}>
                    <Ionicons name="ios-fitness" size={moderateScale(35)} color="#fc686f"/>
                </View>
            )
        }
    },
    Tips: {
        screen: HealthTipsScreen,
        navigationOptions: {
            tabBarIcon: () => (
                <View style={{alignItems: 'center'}}>
                    <Ionicons name="ios-alert" size={moderateScale(35)} color="#fc686f"/>
                </View>
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: "white",
            height: moderateScale(55)
        },
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
            top: 0,
            backgroundColor: "#fc686f",
            height: moderateScale(1)
        },
        iconStyle: {
            height: moderateScale(100),
            width: moderateScale(150)
        }
    },
})

const MainNavigator = createSwitchNavigator({    
    Startup: StartUpScreen,
    Auth: AuthScreen,
    App: AppNavigator
})

export default createAppContainer(MainNavigator)