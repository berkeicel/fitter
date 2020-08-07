import React, {useEffect} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const StartUpScreen = props => {
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData){
                props.navigation.navigate('Auth')
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId} = transformedData

            if(!token || !userId){
                props.navigation.navigate('Auth')
                return;
            }

            props.navigation.navigate("App")
        }

        tryLogin()
    },[])
    
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color="pink"/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartUpScreen