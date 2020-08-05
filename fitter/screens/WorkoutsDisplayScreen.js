import React, {useState} from 'react'
import {View, ScrollView} from 'react-native'
import WorkoutButton from '../components/WorkoutButton'
import { moderateScale } from '../scale'

const WorkoutsDisplayScreen = props => {
    const [workouts, setWorkouts] = useState(props.navigation.getParam("workouts"))

    return(
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            {Object.keys(workouts).map(workout => {
                return(
                    <WorkoutButton 
                        title={workout} 
                        difficulty={workouts[workout]["Difficulty"]} 
                        imageUri={workouts[workout]["ImageBG"]}
                        navigate={() => {
                            props.navigation.navigate("Workout", {
                                title: workout,
                                workouts: workouts[workout]
                            })}}
                    />
                )
            })}
            </ScrollView>
    )
}

WorkoutsDisplayScreen.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam("title")
    }
}

export default WorkoutsDisplayScreen