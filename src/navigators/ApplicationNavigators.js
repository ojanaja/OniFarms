import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigators from './MainStackNavigators';
import AuthenticationStackNavigators from './AuthenticationStackNavigators';
import RNSecureStorage from 'rn-secure-storage';
import SplashScreen from '../screens/welcomeScreen/SplashScreen';

const ApplicationNavigators = () => {
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthToken = async () => {
            try {
                const storedAuthToken = await RNSecureStorage.getItem('authToken');
                if (storedAuthToken) {
                    setAuthToken(storedAuthToken);
                }
            } catch (error) {
                console.error('Error fetching auth token:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        };

        fetchAuthToken();
    }, []);

    return (
        <NavigationContainer>
            {loading ? (
                <SplashScreen />
            ) : (
                <>
                    {authToken ? (
                        <MainStackNavigators />
                    ) : (
                        <AuthenticationStackNavigators />
                    )}
                </>
            )}
        </NavigationContainer>
    );
};

export default ApplicationNavigators;
