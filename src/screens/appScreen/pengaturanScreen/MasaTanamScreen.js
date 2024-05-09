import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const MasaTanamScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <Text style={styles.masaTanamText}>Masa Tanam</Text>
                <Calendar
                    style={styles.calendarStyle}
                    markingType="custom"
                    theme={{
                        todayTextColor: Colors.GREEN,
                        indicatorColor: Colors.PRIMARY,
                        dayTextColor: Colors.BLACK,
                        textDayFontFamily: Fonts.regular,
                        textMonthFontFamily: Fonts.semibold,
                        arrowColor: Colors.PRIMARY,
                        textDayHeaderFontFamily: Fonts.semibold,
                    }}
                />
                <TouchableOpacity style={styles.mulaiTanamButton}>
                    <Text style={styles.mulaiTanamButtonText}>Mulai Tanam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.mulaiTanamContainer,
                    {
                        borderColor: Colors.PRIMARY,
                    }]}
                >
                    <Image source={require('../../../../assets/images/TanamIcon.png')} />
                    <View style={styles.mulaiTanamTextContainer}>
                        <Text style={[
                            styles.mulaiTanamText,
                            {
                                color: Colors.PRIMARY,
                            }]}
                        >Mulai Tanam</Text>
                        <Text style={[
                            styles.mulaiTanamTextTanggal,
                            {
                                color: Colors.PRIMARY,
                            }]}
                        >21/10/2023</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[
                    styles.mulaiTanamContainer,
                    {
                        borderColor: Colors.DARKERYELLOW,
                        marginVertical: wp('5%')
                    }]}
                >
                    <Image source={require('../../../../assets/images/PanenIcon.png')} />
                    <View style={styles.mulaiTanamTextContainer}>
                        <Text style={[
                            styles.mulaiTanamText,
                            {
                                color: Colors.DARKERYELLOW,
                            }]}
                        >Panen</Text>
                        <Text style={[
                            styles.mulaiTanamTextTanggal,
                            {
                                color: Colors.DARKERYELLOW,
                            }]}
                        >21/10/2023</Text>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%'),
    },
    masaTanamText: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginVertical: hp('3%'),
    },
    calendarStyle: {
        width: wp('85%'),
        alignSelf: 'center',
        borderRadius: wp('3%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
    },
    mulaiTanamButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: wp('3.5%'),
        width: wp('26%'),
        height: hp('4.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: hp('2.5%'),
    },
    mulaiTanamButtonText: {
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
        fontSize: 12,
    },
    mulaiTanamContainer: {
        borderRadius: wp('2%'),
        borderWidth: wp('0.3%'),
        elevation: 3,
        gap: wp('3%'),
        backgroundColor: Colors.WHITE,
        alignSelf: 'center',
        width: wp('90%'),
        height: hp('9%'),
        paddingHorizontal: wp('3%'),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mulaiTanamTextContainer: {},
    mulaiTanamText: {
        fontFamily: Fonts.medium,
        fontSize: 15,
    },
    mulaiTanamTextTanggal: {
        fontFamily: Fonts.bold,
        fontSize: 16,
    },
});

export default MasaTanamScreen;
