import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/images/Logo_Onifarm.png')} />
                </View>
                <Text style={styles.textBottom}>By TimBawang_Undip</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%'),
    },
    logoContainer: {
        alignItems: 'center',
        height: hp('100%'),
        justifyContent: 'center',
    },
    textBottom: {
        position: 'absolute',
        alignSelf: 'center',
        top: hp('90%'),
        fontFamily: Fonts.medium,
        color: Colors.PRIMARY,
        fontSize: 12,
    },
});


export default SplashScreen