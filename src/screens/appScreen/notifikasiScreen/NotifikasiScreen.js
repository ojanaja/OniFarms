import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const NotifikasiScreen = () => {
    const notificationItems = new Array(10).fill(null);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);

    const scrollViewRef = useRef();

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((x, y, width, height) => {
                setScrollViewHeight(height);
            });
        }
    }, []);

    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainerStyle}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
        >
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                {notificationItems.map((_, index) => (
                    <View key={index} style={styles.badgeContainer}>
                        <View style={styles.iconContainer}>
                            <Image style={styles.icon} source={require('../../../../assets/images/MenyiramIcon.png')} />
                        </View>
                        <View style={styles.DescContainer}>
                            <Text style={styles.title}>Saatnya menyiram tanamanmu!</Text>
                            <Text style={styles.subTitle}>Pastikan untuk memberi air pada waktu yang telah ditentukan.</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.time}>11 : 00</Text>
                            <Text style={styles.date}>23/12/24</Text>
                        </View>
                    </View>
                ))}
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {},
    linearGradient: {},
    badgeContainer: {
        backgroundColor: Colors.WHITE,
        marginVertical: hp('1%'),
        borderWidth: wp('0.1%'),
        marginHorizontal: wp('5%'),
        borderRadius: wp('4%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.BRIGHTERYELLOW,
        padding: 5,
        borderRadius: wp('7%'),
        width: wp('11.5%'),
        height: hp('5.5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {},
    DescContainer: {
        maxWidth: wp('55%'),
    },
    title: {
        fontFamily: Fonts.bold,
        color: Colors.BLACK,
        fontSize: 10,
    },
    subTitle: {
        fontFamily: Fonts.regular,
        color: Colors.BLACK,
        fontSize: 9,
    },
    dateContainer: {
        alignItems: 'center'
    },
    time: {
        fontFamily: Fonts.regular,
        color: Colors.BLACK,
        fontSize: 11,
    },
    date: {
        fontFamily: Fonts.bold,
        color: Colors.BLACK,
        fontSize: 8,
    },
});

export default NotifikasiScreen;
