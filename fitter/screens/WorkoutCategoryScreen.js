import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native'

import { scale, moderateScale, verticalScale} from '../scale';
import CategoryButton from '../components/CategoryButton'
import HeaderButton from '../components/HeaderButton'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'


const WorkoutCategoryScreen = props => {
    const [workouts, setWorkouts] = useState(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    getWorkouts = async () => {
		const response = await fetch('https://fitter-5d923.firebaseio.com/workouts.json')
        const json = await response.json()
        setWorkouts(json)
        setHasLoaded(true)
    }
    
    useEffect(() => {
        getWorkouts()
    }, [])
    
    if(!hasLoaded){
        return(
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="black"/>
            </View>
        )
    }
    return(
        <View style={{alignItems: 'center'}}>
            <FlatList
                style={{height: '100%',width: '100%', flexGrow: 1}}
                contentContainerStyle={{alignItems: 'center'}}
                data={Object.keys(workouts)}
                numColumns={2}
                keyExtractor={item => item}
				renderItem={({ item }) => (
                    <CategoryButton navigate={() => {
                        props.navigation.navigate("WorkoutsDisplay", {
                            title: item,
                            workouts: workouts[item]
                        })
                        }} 
                        title={item} 
                        imageUri={workouts[item]["ImageBG"]}/>
				)}
			/>
        </View>
    )
}

const styles = StyleSheet.create({

})

WorkoutCategoryScreen.navigationOptions = navData => {
    return {
        headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item 
					title='Settings' 
					iconName={"ios-cog"}
					onPress={() => {
						navData.navigation.navigate("Settings")
					}}
				/>
			</HeaderButtons>)
    }
}

export default WorkoutCategoryScreen