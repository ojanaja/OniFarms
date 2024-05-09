import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigators from './BottomTabNavigators'
import MainStackNavigators from './MainStackNavigators'

const ApplicationNavigators = () => {
    return (
        <NavigationContainer>
            <MainStackNavigators />
        </NavigationContainer>
    )
}

export default ApplicationNavigators