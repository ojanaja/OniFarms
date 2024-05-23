import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const MasaTanamScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [harvestDate, setHarvestDate] = useState(new Date(new Date().setDate(new Date().getDate() + 100)));
    const [markedDates, setMarkedDates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Update harvest date based on the selected date
        const newHarvestDate = new Date(selectedDate);
        newHarvestDate.setDate(newHarvestDate.getDate() + 100);
        setHarvestDate(newHarvestDate);
    }, [selectedDate]);

    useEffect(() => {
        const getStoredDate = async () => {
            try {
                const storedDateString = await AsyncStorage.getItem('plantingDate');
                if (storedDateString) {
                    const storedDate = new Date(storedDateString);
                    setSelectedDate(storedDate);
                }
            } catch (error) {
                console.error('Failed to load the date from storage:', error);
            } finally {
                setLoading(false);
            }
        };

        getStoredDate();
    }, []);

    useEffect(() => {
        // Mark dates from selectedDate to harvestDate
        const newMarkedDates = {};
        let currentDate = new Date(selectedDate);
        while (currentDate <= harvestDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            newMarkedDates[dateString] = { marked: true, dotColor: Colors.PRIMARY };
            currentDate.setDate(currentDate.getDate() + 1);
        }
        setMarkedDates(newMarkedDates);
    }, [selectedDate, harvestDate]);

    const onDayPress = (day) => {
        const plantingDate = new Date(day.dateString);
        setSelectedDate(plantingDate);
    };

    const formatDateString = (date) => {
        if (!date) { return ''; }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleMulaiTanamPress = async () => {
        if (!selectedDate) {
            Alert.alert('Error', 'Please select a date from the calendar first.');
        } else {
            try {
                await AsyncStorage.setItem('plantingDate', selectedDate.toISOString());
                Alert.alert('Success', 'Tanggal tanam tersimpan!');
            } catch (error) {
                console.error('Failed to save the date to storage:', error);
                Alert.alert('Error', 'Failed to save the planting date.');
            }
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
                <Text style={styles.masaTanamText}>Masa Tanam</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ alignSelf: 'center' }} />
                ) : (
                    <>
                        <Calendar
                            style={styles.calendarStyle}
                            onDayPress={onDayPress}
                            markedDates={markedDates}
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
                        <TouchableOpacity style={styles.mulaiTanamButton} onPress={handleMulaiTanamPress}>
                            <Text style={styles.mulaiTanamButtonText}>Mulai Tanam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[
                            styles.mulaiTanamContainer,
                            { borderColor: Colors.PRIMARY }
                        ]}>
                            <Image source={require('../../../../assets/images/TanamIcon.png')} />
                            <View style={styles.mulaiTanamTextContainer}>
                                <Text style={[
                                    styles.mulaiTanamText,
                                    { color: Colors.PRIMARY }
                                ]}>Mulai Tanam</Text>
                                <Text style={[
                                    styles.mulaiTanamTextTanggal,
                                    { color: Colors.PRIMARY }
                                ]}>{formatDateString(selectedDate)}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[
                            styles.mulaiTanamContainer,
                            { borderColor: Colors.DARKERYELLOW, marginVertical: wp('5%') }
                        ]}>
                            <Image source={require('../../../../assets/images/PanenIcon.png')} />
                            <View style={styles.mulaiTanamTextContainer}>
                                <Text style={[
                                    styles.mulaiTanamText,
                                    { color: Colors.DARKERYELLOW }
                                ]}>Panen</Text>
                                <Text style={[
                                    styles.mulaiTanamTextTanggal,
                                    { color: Colors.DARKERYELLOW }
                                ]}>{formatDateString(harvestDate)}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
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
