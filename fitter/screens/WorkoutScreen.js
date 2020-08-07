import React, {useState} from 'react'
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'


import { moderateScale } from '../scale'


const WorkoutScreen = props => {
    const [workout, setWorkout] = useState(props.navigation.getParam("workout"))
    const [workoutTitle, setWorkoutTitle] = useState(props.navigation.getParam("title"))


    getColor = () => {
        if (workout["Difficulty"] === "Easy") {
            return {backgroundColor: '#48A9A6'}
        } else if(workout["Difficulty"] === "Medium") {
            return {backgroundColor: '#F2542D'}
        } else {
            return {backgroundColor: '#C1666B'}
        }
    }

    console.log(workout)
    return(
        <View>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Image style={styles.image} source={{uri: workout["ImageBG"]}}/>
                <View>
                    <LinearGradient style={styles.container} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
                        <Text style={styles.titleText}>{workoutTitle}</Text>
                        <View style={{...styles.difficultyContainer, ...getColor()}}>
                            <Text style={styles.difficulty}>{workout["Difficulty"]}</Text>
                        </View>
                        <Text style={styles.titleText}>Equipment Needed: <Text style={styles.text}>{workout["Equipment"]}</Text></Text>
                        <Text style={styles.titleText}>How To: <Text style={styles.text}>{workout["How To"]}</Text></Text>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    difficultyContainer: {
        backgroundColor: 'green',
        borderRadius: moderateScale(15),
        marginTop: moderateScale(10)
    },
    difficulty: {
        fontSize: moderateScale(22),
        color: 'white',
        paddingHorizontal: moderateScale(10)
    },
    image: {
        width: moderateScale(250),
        height: moderateScale(300),
        resizeMode: 'contain',
        borderRadius: moderateScale(15)
    },
    container: {
        width: '90%',
        alignItems: 'center', 
        paddingVertical: moderateScale(20), 
        paddingHorizontal: moderateScale(10), 
        borderRadius: moderateScale(15),
        marginBottom: moderateScale(20)
    },
    titleText: {
        fontSize: moderateScale(25),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    text: {
        fontSize: moderateScale(18),
        color: 'white',
    }
})

WorkoutScreen.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam("title")
    }
}

export default WorkoutScreen