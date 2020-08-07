import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import { scale, moderateScale, verticalScale} from '../scale';


const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={moderateScale(30)} color={"white"}/>
}

export default CustomHeaderButton