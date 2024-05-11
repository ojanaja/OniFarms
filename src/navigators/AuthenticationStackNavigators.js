import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../screens/authScreen/LoginScreen';
import RegisterScreen from '../screens/authScreen/RegisterScreen';
import BottomTabNavigators from './BottomTabNavigators';
import SplashScreen from '../screens/welcomeScreen/SplashScreen';

const Stack = createStackNavigator();

const AuthenticationStackNavigators = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
                name="BottomTab"
                component={BottomTabNavigators}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
};

export default AuthenticationStackNavigators