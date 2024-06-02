import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigators from './MainStackNavigators';
import AuthenticationStackNavigators from './AuthenticationStackNavigators';
import RNSecureStorage from 'rn-secure-storage';
import SplashScreen from '../screens/welcomeScreen/SplashScreen';

/**
 * Component for managing application navigation.
 * Checks for authentication token on app startup and displays
 * the appropriate stack navigator based on authentication status.
 */
const ApplicationNavigators = () => {
    // State to store the authentication token
    const [authToken, setAuthToken] = useState(null);
    // State to manage loading state while fetching token
    const [loading, setLoading] = useState(true);

    // Effect hook to fetch authentication token on component mount
    useEffect(() => {
        const fetchAuthToken = async () => {
            try {
                // Attempt to fetch authentication token from secure storage
                const storedAuthToken = await RNSecureStorage.getItem('authToken');
                // If token exists, set it in state
                if (storedAuthToken) {
                    setAuthToken(storedAuthToken);
                }

                console.log('No Token Stored');
            } catch (error) {
                // Log error if fetching token fails
                console.error('Error fetching auth token:', error);
            } finally {
                // Set loading state to false after 3 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        };

        // Invoke fetchAuthToken function
        fetchAuthToken();
    }, []);

    return (
        <NavigationContainer>
            {/* Display SplashScreen while loading */}
            {loading ? (
                <SplashScreen />
            ) : (
                // Display appropriate stack navigator based on authentication status
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
