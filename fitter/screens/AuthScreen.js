import React, {useReducer, useCallback, useState, useEffect} from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity, Keyboard, AsyncStorage, Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

import Card from '../components/Card'
import scale, { moderateScale } from '../scale'

import Input from '../components/Input'
import StyledImport from '../components/StyledInput'
import StyledInput from '../components/StyledInput'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData', 
        JSON.stringify({
            token: token,
            userId: userId,
    }))
}

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
	const [error, setError] = useState()
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

	const signup = async (email, password) => {
		setError(null)

		try{
		const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLkE4CHExWqMg0My11g5VPoHNeRqPHXig', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true
			})
		})

		if(!response.ok){
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went Wrong'
			if(errorId === 'EMAIL_EXISTS'){
				message = 'This email is already in use :('
			}
			throw new Error(message)
		}
		
		const resData = await response.json()
		saveDataToStorage(resData.idToken, resData.localId)
		props.navigation.navigate("App")
		} catch(err) {
			setError(err.message)
		}
	}

	const login = async (email, password) => {
		setError(null)

		try{
		const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLkE4CHExWqMg0My11g5VPoHNeRqPHXig', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password,
				returnSecureToken: true
			})
		})

		if(!response.ok){
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went Wrong'
			if(errorId === 'EMAIL_NOT_FOUND'){
				message = 'This email could not be found :('
			} else if(errorId === 'INVALID_PASSWORD'){
				message = 'This password is incorrect'
			}
			throw new Error(message)
		}
		
		const resData = await response.json()
		saveDataToStorage(resData.idToken, resData.localId)
		props.navigation.navigate("App")
		} catch(err) {
			setError(err.message)
		}
	}

	useEffect(() => {
		if(error){
			Alert.alert("Try again!", error, [{text: 'okay'}])
		}
	}, [error])

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
						Keyboard.dismiss()
						if(!formState.inputValidities.email){
							Alert.alert("Invalid E-Mail Adress!", "Make sure to provide a correct email adress", [{text: 'okay'}])
						} else if(!formState.inputValidities.password){
							Alert.alert("Invalid Password!", "Make sure to provide a valid password", [{text: 'okay'}])
						} else {
							login(formState.inputValues.email, formState.inputValues.password)
						}
						}}>
							<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => {
						Keyboard.dismiss()
						if(!formState.inputValidities.email){
							Alert.alert("Invalid E-Mail Adress!", "Make sure to provide a correct email adress", [{text: 'okay'}])
						} else if(!formState.inputValidities.password){
							Alert.alert("Invalid Password!", "Make sure to provide a valid password", [{text: 'okay'}])
						} else {
							signup(formState.inputValues.email, formState.inputValues.password)
						}
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
		paddingVertical: moderateScale(35),
	},
	logo: {
		resizeMode: 'contain',
		height: moderateScale(80),
		marginBottom: moderateScale(10)
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
		paddingVertical: moderateScale(2),
	}
})

export default AuthScreen