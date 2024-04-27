import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticationStackNavigators from './AuthenticationStackNavigators'

const ApplicationNavigators = () => {
    return (
        <NavigationContainer>
            <AuthenticationStackNavigators />
        </NavigationContainer>
    )
}

export default ApplicationNavigators