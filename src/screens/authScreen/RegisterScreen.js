import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppDescLogo from '../../components/AppDescLogo';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-element-textinput';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import {
    statusCodes,
    isErrorWithCode,
    GoogleSignin
} from '@react-native-google-signin/google-signin';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            // Create user with email and password
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            // Get the user's ID
            const userId = userCredential.user.uid;
            // Add additional user data to Firestore
            await firestore().collection('users').doc(userId).set({
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                // Add any other fields you want to store
            });

            // Registration successful
            ToastAndroid.show('Registration successful', ToastAndroid.LONG);

            // Navigate to another screen or perform any necessary action
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error(error)
            // Handle errors
            if (error.code === 'auth/email-already-in-use') {
                ToastAndroid.show('Email address is already in use', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Registration failed', ToastAndroid.LONG);
            }
        }
    };

    GoogleSignin.configure({
        webClientId: '452685691971-tg8v8gn73b5uvfo2u1bigc3a0rdp5fl4.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
        hostedDomain: 'http://oniversetech-52a39.firebaseapp.com', // specifies a hosted domain restriction
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });

    const handleGoogleSignUp = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const token = userInfo.idToken;
            // Assuming you have a method to handle successful sign-in with Google
            handleSuccessfulLogin(token);
        } catch (error) {
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

    const handleSuccessfulLogin = async (token) => {
        try {
            // // Store the token securely
            console.table(token);
            await RNSecureStorage.setItem('authToken', token, { accessible: ACCESSIBLE.WHEN_UNLOCKED }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
            // Navigate to the desired screen
            navigation.navigate('BottomTab');
        } catch (error) {
            // Handle error
            console.error('Error storing token:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    style={styles.linearGradient}
                    start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                    colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                    locations={[0.1, 0.5, 1]}
                >
                    <AppDescLogo />
                    <View style={styles.textInputContainer}>
                        <TextInput
                            value={name}
                            style={styles.input}
                            inputStyle={styles.inputStyle}
                            labelStyle={styles.labelStyle}
                            placeholderStyle={styles.placeholderStyle}
                            textErrorStyle={styles.textErrorStyle}
                            label="Nama"
                            placeholder="Masukkan nama"
                            placeholderTextColor={Colors.PLACEHOLDERTEXT}
                            focusColor={Colors.PRIMARY}
                            onChangeText={text => {
                                setName(text);
                            }}
                        />
                        <TextInput
                            value={phoneNumber}
                            style={styles.input}
                            inputStyle={styles.inputStyle}
                            labelStyle={styles.labelStyle}
                            placeholderStyle={styles.placeholderStyle}
                            textErrorStyle={styles.textErrorStyle}
                            label="No. Telepon"
                            placeholder="Masukkan nomor telepon"
                            placeholderTextColor={Colors.PLACEHOLDERTEXT}
                            focusColor={Colors.PRIMARY}
                            onChangeText={text => {
                                setPhoneNumber(text);
                            }}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            value={email}
                            style={styles.input}
                            inputStyle={styles.inputStyle}
                            labelStyle={styles.labelStyle}
                            placeholderStyle={styles.placeholderStyle}
                            textErrorStyle={styles.textErrorStyle}
                            label="Email"
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
                            onPress={handleRegister}
                            style={styles.registerButton}
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.registerGoogle}
                            onPress={handleGoogleSignUp}
                        >
                            <Image source={require('../../../assets/images/googleIcon.png')} />
                            <Text style={styles.registerGoogleText}>Register dengan Google</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
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
        backgroundColor: Colors.LABELINPUTCOLOR,
        paddingHorizontal: 5,
        marginLeft: 10,
        borderRadius: 5,
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
        backgroundColor: Colors.PRIMARY,
        borderRadius: wp('4%'),
        paddingHorizontal: wp('7.5%'),
        paddingVertical: hp('1%'),
        marginVertical: hp('1%')
    },
    registerButtonText: {
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
        fontSize: 12,
    },
    registerGoogle: {
        flexDirection: 'row',
        gap: wp('2%'),
        marginTop: hp('3%'),
    },
    registerGoogleText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.PRIMARY,
    },
})

export default RegisterScreen;
