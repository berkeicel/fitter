import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native'

import { scale, moderateScale, verticalScale} from '../scale';
import CategoryButton from '../components/CategoryButton'



const WorkoutCategoryScreen = props => {
    const [workouts, setWorkouts] = useState(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    getWorkouts = async () => {
		const response = await fetch('https://fitter-5d923.firebaseio.com/workouts.json')
        const json = await response.json()
        console.log(json)
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
                style={{height: '100%', flexGrow: 1}}
                data={Object.keys(workouts)}
                numColumns={2}
                keyExtractor={item => workouts.toString()}
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

export default WorkoutCategoryScreen