import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native'
import { moderateScale } from '../scale'
import {LinearGradient} from 'expo-linear-gradient'



const CategoryButton = props => {
  return(
    <TouchableOpacity onPress={() => {
        props.navigate()
    }}>
        <View  style={styles.main}>
            <View style={{height: '75%', width: "100%"}}>
                <Image style={styles.image} source={{uri: props.imageUri}}/>
            </View>
            <View style={styles.textContainer}>
                <LinearGradient style={{height: "100%", justifyContent: 'center'}} colors={["#ff934c", "#fc686f"]} start={[0, 1]} end={[1, 0]}>
                    <Text style={styles.text}>{props.title}</Text>
                </LinearGradient>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        borderRadius: moderateScale(7),
        overflow: 'hidden',
        width: moderateScale(175),
        height: moderateScale(270),
        marginVertical: moderateScale(10),
        marginHorizontal: moderateScale(5),
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'stretch'
    },
    textContainer: {
        height: "25%",
        width: "100%",
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: moderateScale(22),
        color: 'white',
        fontWeight: 'bold'
    }
})

export default CategoryButton