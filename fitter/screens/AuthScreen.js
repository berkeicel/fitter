import React, {useReducer, useCallback} from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Keyboard} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

import Card from '../components/Card'
import scale, { moderateScale } from '../scale'

import Input from '../components/Input'
import StyledImport from '../components/StyledInput'
import StyledInput from '../components/StyledInput'
import { withOrientation } from 'react-navigation'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE){
			const updatedValues = {
					...state.inputValues,
					[action.input]: action.value
			}
			const updatedValidities = {
					...state.inputValidities,
					[action.input]: action.isValid
			}
			let updatedFormIsValid = true
			for (const key in updatedValidities){
					updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
			}
			return {
					formIsValid: updatedFormIsValid,
					inputValidities: updatedValidities,
					inputValues: updatedValues
			}
	}
	return state

}

const AuthScreen = props => {
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
				password : '',
				email: ''
		}, 
		inputValidities: {
				password: false,
				email: false
		}, 
		formIsValid: false
	})

	const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
		dispatchFormState({
				type: FORM_INPUT_UPDATE, 
				value: inputValue, 
				isValid: inputValidity, 
				input: inputIdentifier
		})
}, [dispatchFormState])
  return(
		<View style={styles.screen}>
			<LinearGradient style={styles.gradient} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
				<Card style={styles.card}>
					<Image style={styles.logo} source={require('../assets/logo.png')}/>
					<StyledInput 
						id='email' 
						keyboardType='email-address' 
						autoCapitalize="none"
						errorText="Please enter a valid email"
						onInputChange={inputChangeHandler}
						initialValue='E-mail'
						iconName="mail-bulk"
					/>
					<StyledInput 
						id='password' 
						keyboardType='default' 
						autoCapitalize="none"
						errorText="Please enter a valid password"
						onInputChange={inputChangeHandler}
						initialValue='Password'
						iconName="key"
						inputField={{marginBottom: moderateScale(30)}}
					/>
				</Card>
				<View style={{flexDirection: 'row', paddingTop: moderateScale(20), width: '100%', justifyContent: 'space-evenly'}}>
					<TouchableOpacity style={styles.button} onPress={() => {
						}}>
							<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => {
						Keyboard.dismiss()
						props.navigation.navigate("App")
						}}>
							<Text style={styles.buttonText}>Signup</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
)}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	gradient: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	card: {
		width: '90%',
		borderRadius: moderateScale(10),
		paddingVertical: moderateScale(10),
	},
	logo: {
		resizeMode: 'center',
		height: moderateScale(80)
	},
	button: {
		borderColor: 'white',
		borderRadius: moderateScale(5),
		borderWidth: moderateScale(2),
	},
	buttonText: {
		fontSize: moderateScale(30),
		color: 'white',
		paddingHorizontal: moderateScale(10),
		paddingVertical: moderateScale(2)
	}
})

export default AuthScreen