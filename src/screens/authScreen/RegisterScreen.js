import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppDescLogo from '../../components/AppDescLogo';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-element-textinput';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [value, setValue] = useState('');
    const navigation = useNavigation()


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
                        value={value}
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
                            setValue(text);
                        }}
                    />
                    <TextInput
                        value={value}
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
                            setValue(text);
                        }}
                        keyboardType="email-address"
                    />
                    <TextInput
                        value={value}
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
                            setValue(text);
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        onPress={() => { }}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>Register</Text>
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
        gap: hp('0.5%')
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
        paddingVertical: hp('1%')
    },
    loginButtonText: {
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
        fontSize: 12,
    },
})

export default RegisterScreen;
