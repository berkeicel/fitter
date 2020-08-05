import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native'
import { moderateScale } from '../scale'
import {LinearGradient} from 'expo-linear-gradient'


const WorkoutButton = props => {
    getColor = () => {
        if (props.difficulty === "Easy") {
            return {backgroundColor: '#48A9A6'}
        } else if(props.difficulty === "Medium") {
            return {backgroundColor: '#F2542D'}
        } else {
            return {backgroundColor: '#C1666B'}
        }
    }
    return(
      <TouchableOpacity style={{height: moderateScale(120), width: '95%', marginVertical: moderateScale(15)}} onPress={() => {
        props.navigate()
    }}>
          <View style={styles.card}>
            <View style={{width: '70%', alignItems: 'center', justifyContent: 'center'}}>
                <LinearGradient style={{height: "100%", justifyContent: 'center', alignItems: 'center', width: '100%'}} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
                    <Text style={styles.title}>{props.title}</Text>
                    <View style={{...styles.difficultyContainer, ...getColor()}}>
                        <Text style={styles.difficulty}>{props.difficulty}</Text>
                    </View>
                </LinearGradient>
            </View>
            <View style={{width: "30%"}}>
                <Image style={styles.image} source={{uri: props.imageUri}}/>
            </View>
          </View>
      </TouchableOpacity>
    )
  }
  
  const styles = StyleSheet.create({
      card: {
          flexDirection: 'row',
          borderRadius: moderateScale(15),
          overflow: 'hidden'
      },
      title: {
          fontSize: moderateScale(25),
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'
      },
      difficultyContainer: {
          backgroundColor: 'green',
          borderRadius: moderateScale(15),
          marginTop: moderateScale(10)
      },
      difficulty: {
          fontSize: moderateScale(18),
          color: 'white',
          paddingHorizontal: moderateScale(10)
      },
      image: {
        width: "100%",
        height: "100%",
        resizeMode: 'stretch'
    },
  })
  
  export default WorkoutButton