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

const WorkoutNavigator = createStackNavigator({
    Categories: WorkoutCategoryScreen,
    WorkoutsDisplay: WorkoutsDisplayScreen,
    Workout: WorkoutScreen,
    Settings: SettingsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#030018',
            height: moderateScale(70)
        },
        headerTitleStyle: {
            fontSize: moderateScale(24),
            color: 'white',
            alignSelf: 'center'
        },
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
                <View>
                    <Ionicons name="ios-fitness" size={27} color="#fc686f"/>
                </View>
            )
        }
    },
    Tips: {
        screen: HealthTipsScreen,
        navigationOptions: {
            tabBarIcon: () => (
                <View>
                    <Ionicons name="ios-alert" size={28} color="#fc686f"/>
                </View>
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: "white",
        },
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
            top: 0,
            backgroundColor: "#fc686f"
        }
    },
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthScreen,
    App: AppNavigator
})

export default createAppContainer(MainNavigator)