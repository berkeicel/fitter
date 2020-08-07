import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Text, FlatList} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

import { scale, moderateScale, verticalScale} from '../scale';


const HealthTipsScreen = props => {
	const [tips, setTips] = useState(null)

	useEffect(() => {
		getFitnessTips()
	}, [])

	getFitnessTips = async () => {
		const response = await fetch('https://fitter-5d923.firebaseio.com/fitnessTips/fitnessTips.json')
		const json = await response.json()
		setTips(json)
	}
	
	renderHeader = () => {
		return (
			<LinearGradient style={styles.gradientTitle} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
				<Text style={styles.title}>Fitness Tips</Text>
      		</LinearGradient>
		)
	}
  return(
    <View style={{alignItems: 'center',height: '100%', justifyContent: 'center'}}>
			<FlatList
				style={{width: '100%', flexGrow: 1}}
				data={tips}
				renderItem={({ item, index }) => (
					<View style={{alignItems: 'center'}}>
						<LinearGradient style={styles.gradient} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
							<View style={{width: '80%'}}>
								<Text style={styles.subText}>Tip #{index + 1}</Text>
								<Text style={styles.text}>{item}</Text>
							</View>
						</LinearGradient>
					</View>
				)}
				keyExtractor={(item, index) => index.toString()}
				ListHeaderComponent={renderHeader}
			/>
    </View>
  )
}

const styles = StyleSheet.create({
	gradientTitle: {
		width: '100%',
		height: moderateScale(120),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: moderateScale(30),
		borderBottomRightRadius: 50
	},
	title: {
		fontSize: moderateScale(35),
		color: 'white',
		fontWeight: 'bold'
	},
	gradient: {
		width: '90%',
		minHeight: moderateScale(100),
		paddingVertical: moderateScale(15),
		borderRadius: moderateScale(12),
		justifyContent: 'center',
		shadowColor: 'black',
  		shadowOpacity: moderateScale(0.58),
  		shadowOffset: { width: 0, height: 2},
  		shadowRadius: moderateScale(16.00),
		elevation: 24,
		marginBottom: moderateScale(30),
		alignItems: 'center'
	},
	text: {
		fontSize: moderateScale(25),
		color: 'white',
		textAlign: 'center',
	},
	subText: {
		fontSize: moderateScale(15),
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
	}
})

export default HealthTipsScreen