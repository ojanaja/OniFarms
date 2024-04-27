import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Fonts from '../constants/Fonts'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

const AppDescLogo = () => {
    return (
        <View style={styles.appLogoContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/images/Logo_Onifarm.png')} />
                <Text style={styles.logoText}>nifarm</Text>
            </View>
            <Text style={styles.appDescText}>Sistem monitoring tanah bawang merah IoT</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    appLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('20.7%'),
    },
    logo: {
        width: 61,
        height: 73,
    },
    logoText: {
        fontFamily: Fonts.medium,
        fontSize: wp('10%'),
        color: Colors.TEXTCOLOR,
    },
    appDescText: {
        fontFamily: Fonts.regular,
        color: Colors.TEXTCOLOR,
        fontSize: wp('3%'),
    }
})

export default AppDescLogo;
