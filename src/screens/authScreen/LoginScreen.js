import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppDescLogo from '../../components/AppDescLogo';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-element-textinput';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
    statusCodes,
    isErrorWithCode,
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    // Configuration for Google Sign-In
    GoogleSignin.configure({
        webClientId: '452685691971-tg8v8gn73b5uvfo2u1bigc3a0rdp5fl4.apps.googleusercontent.com',
        hostedDomain: 'http://oniversetech-52a39.firebaseapp.com',
        profileImageSize: 120,
    });

    // Function to handle email/password login
    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                // Get the current user
                const currentUser = auth().currentUser;
                if (currentUser) {
                    // Get the ID token
                    const token = await currentUser.getIdToken();
                    // Handle successful login
                    handleSuccessfulLogin(token);
                } else {
                    // Handle case where user is not found
                    ToastAndroid.show('User not found', ToastAndroid.LONG);
                }
            })
            .catch(error => {
                // Handle login errors
                ToastAndroid.show('Login Error', ToastAndroid.LONG);
            });
    };

    // Function to handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            // Check if Google Play Services are available
            await GoogleSignin.hasPlayServices();
            // Sign in with Google
            const userInfo = await GoogleSignin.signIn();
            const token = userInfo.idToken;
            // Handle successful Google Sign-In
            handleSuccessfulLogin(token);
        } catch (error) {
            // Handle Google Sign-In errors
            console.error(error)
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
                        ToastAndroid.show('No saved Google account found. Please use normal sign-in.', ToastAndroid.LONG);
                        break;
                    case statusCodes.SIGN_IN_CANCELLED:
                        ToastAndroid.show('Sign in cancelled', ToastAndroid.LONG);
                        break;
                    case statusCodes.ONE_TAP_START_FAILED:
                        ToastAndroid.show('One tap sign-in failed. Please try again.', ToastAndroid.LONG);
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        ToastAndroid.show('Google Play Services not available. Please update or enable it.', ToastAndroid.LONG);
                        break;
                    default:
                        ToastAndroid.show('An unknown error occurred with Google Sign-In.', ToastAndroid.LONG);
                }
            } else {
                ToastAndroid.show(`An error occurred: ${error.message}`, ToastAndroid.LONG);
            }
        }
    };

    // Function to handle successful login
    const handleSuccessfulLogin = async (token) => {
        try {
            // Store the authentication token securely
            await RNSecureStorage.setItem('authToken', token, { accessible: ACCESSIBLE.WHEN_UNLOCKED }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
            // Navigate to the desired screen
            navigation.navigate('BottomTab');
        } catch (error) {
            // Handle error storing token
            console.error('Error storing token:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <AppDescLogo />
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={email}
                        style={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        textErrorStyle={styles.textErrorStyle}
                        label="Email / No. Telepon"
                        placeholder="Masukkan email"
                        placeholderTextColor={Colors.PLACEHOLDERTEXT}
                        focusColor={Colors.PRIMARY}
                        onChangeText={text => {
                            setEmail(text);
                        }}
                        keyboardType="email-address"
                    />
                    <TextInput
                        value={password}
                        style={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        textErrorStyle={styles.textErrorStyle}
                        label="Password"
                        placeholder="Masukkan password"
                        placeholderTextColor={Colors.PLACEHOLDERTEXT}
                        focusColor={Colors.PRIMARY}
                        onChangeText={text => {
                            setPassword(text);
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RegisterScreen')}
                    >
                        <Text style={styles.registerButton}>Belum punya akun?<Text style={styles.registerButtonUnderline}> Register disini</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginGoogle}
                        onPress={handleGoogleSignIn}
                    >
                        <Image source={require('../../../assets/images/googleIcon.png')} />
                        <Text style={styles.loginGoogleText}>Login dengan Google</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%')
    },
    textInputContainer: {
        alignItems: 'center',
        marginVertical: hp('4%'),
        gap: hp('3%'),
    },
    input: {
        width: wp('90%'),
        height: hp('6%'),
        paddingHorizontal: 12,
        borderRadius: wp('4%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
        fontFamily: Fonts.semibold,
    },
    inputStyle: {
        fontSize: 13,
        fontFamily: Fonts.regular,
    },
    labelStyle: {
        fontSize: 10,
        position: 'absolute',
        top: -10,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 5,
        marginLeft: 10,
        borderRadius: 10,
        fontFamily: Fonts.semibold,
    },
    placeholderStyle: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: Colors.PLACEHOLDERTEXT
    },
    textErrorStyle: { fontSize: 13 },
    buttonContainer: {
        alignItems: 'center',
    },
    registerButton: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        color: Colors.PRIMARY,
    },
    registerButtonUnderline: {
        fontFamily: Fonts.semibold,
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: wp('4%'),
        paddingHorizontal: wp('7.5%'),
        paddingVertical: hp('1%'),
        marginVertical: hp('2%')
    },
    loginButtonText: {
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
        fontSize: 12,
    },
    loginGoogle: {
        flexDirection: 'row',
        gap: wp('2%'),
        marginTop: hp('1%')
    },
    loginGoogleText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.PRIMARY
    },
})

export default LoginScreen;
