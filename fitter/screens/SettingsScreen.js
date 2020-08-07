import React from 'react'
import {View, StyleSheet, AsyncStorage, TouchableOpacity, Text} from 'react-native'
import { moderateScale } from '../scale'



const SettingsScreen = props => {
    return(
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => {
                AsyncStorage.removeItem('userData')
                props.navigation.navigate("Auth")
			}}>
				<Text style={styles.buttonText}>Log Out</Text>
			</TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: moderateScale(25),
		borderColor: '#fc686f',
		borderRadius: moderateScale(5),
		borderWidth: moderateScale(2),
	},
	buttonText: {
		fontSize: moderateScale(30),
		color: '#fc686f',
		paddingHorizontal: moderateScale(15),
		paddingVertical: moderateScale(5),
	}
})

export default SettingsScreen