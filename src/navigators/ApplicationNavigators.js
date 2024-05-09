import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigators from './MainStackNavigators';
import AuthenticationStackNavigators from './AuthenticationStackNavigators';
import RNSecureStorage from 'rn-secure-storage';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../constants/Colors';

const ApplicationNavigators = () => {
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate checking for auth token on component mount
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
                setLoading(false); // Set loading to false after fetching token
            }
        };

        fetchAuthToken();
    }, []);

    if (loading) {
        // Show loading indicator while fetching token
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {authToken ? <MainStackNavigators /> : <AuthenticationStackNavigators />}
        </NavigationContainer>
    );
};

export default ApplicationNavigators;
