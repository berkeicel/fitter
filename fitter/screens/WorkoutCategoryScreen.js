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
        <View>
            <FlatList
                style={{height: '100%', flexGrow: 1}}
                contentContainerStyle={{height: "100%"}}
                data={Object.keys(workouts)}
                keyExtractor={item => workouts.toString()}
				renderItem={({ item }) => (
                    <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
                        <View  style={{height: "45%", width: '45%'}}>
                            <CategoryButton navigate={() => {props.navigation.navigate("WorkoutsDisplay")}} title={item} imageUri={"https://www.bodybuilding.com/images/2018/june/how-to-build-bicep-peaks-of-perfection-tall.jpg"}/>
                        </View>
                    </View>
				)}
			/>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default WorkoutCategoryScreen