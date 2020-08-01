import React from 'react'
import {StyleSheet, View} from 'react-native'

import Input from './Input'
import { moderateScale } from '../scale'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';


const StyledInput = props => {
  return(
    <View style={{...styles.main, ...props.inputField}}>
        <View style={{width: "20%", alignItems: 'center'}}>
            <FontAwesome5 name={props.iconName} size={moderateScale(25)} color="#ff934c"/>
        </View>
        <Input 
            id={props.id} 
            keyboardType={props.keyboardType} 
            autoCapitalize={props.autoCapitalize}
            errorText={props.errorText}
            onInputChange={props.onInputChange}
            initialValue={props.initialValue}
            inputStyle={styles.inputStyle}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'flex-end', 
        flexDirection: 'row', 
        borderBottomWidth: moderateScale(2),
        borderColor: '#ff934c',
        width: '80%',
        paddingBottom: moderateScale(8),
        marginVertical: 10
    },
    inputStyle: {
        borderWidth: 0,
        fontSize: moderateScale(25),
        width: "80%",
        borderRadius: 0,
    }
})

export default StyledInput