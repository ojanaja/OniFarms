import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { Table, Row, Rows } from 'react-native-table-component';
import { useNavigation } from '@react-navigation/native';

const calculateParameterColor = (status) => {
    switch (status) {
        case 'normal':
            return Colors.WARNINGORANGE;
        case 'tinggi':
            return Colors.RED;
        case 'rendah':
            return Colors.GREEN;
    }
};

const KesuburanScreen = () => {
    const navigation = useNavigation();

    // State to manage the height of ScrollView
    const [scrollViewHeight, setScrollViewHeight] = useState(0);

    // Reference to ScrollView
    const scrollViewRef = useRef();

    // Effect to measure the height of ScrollView on mount
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((x, y, width, height) => {
                setScrollViewHeight(height);
            });
        }
    }, []);

    // Data for the table
    const tableData = [
        ['Suhu', ':', '25 - 30 C'],
        ['Kelembapan', ':', '65 - 80 %'],
        ['pH', ':', '5 - 8'],
        ['Nitrogen', ':', '100 - 200ppm'],
        ['Phosphor', ':', '100 - 200ppm'],
        ['Kalium', ':', '100 - 200ppm'],
    ];

    // Example parameter statuses
    const parameterStatuses = {
        Suhu: 'normal',
        Kelembapan: 'tinggi',
        pH: 'normal',
        Nitrogen: 'rendah',
        Phosphor: 'normal',
        Kalium: 'normal',
    };

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
                <View style={styles.indicatorContainer}>
                    <View style={styles.indicatorCircle}>
                        <Text style={styles.indicatorText}>100</Text>
                        <Text style={styles.indicatorTextPercentage}>%</Text>
                    </View>
                    <View style={styles.indicatorLevelContainer}>
                        <View style={styles.indicatorLevelTextContainer}>
                            <View style={styles.indicatorLevelExtremeRectangle} />
                            <Text style={styles.indicatorLevelExtremeText}>Ekstrim</Text>
                        </View>
                        <View style={styles.indicatorLevelTextContainer}>
                            <View style={styles.indicatorLevelSedangRectangle} />
                            <Text style={styles.indicatorLevelSedangText}>Sedang</Text>
                        </View>
                        <View style={styles.indicatorLevelTextContainer}>
                            <View style={styles.indicatorLevelNormalRectangle} />
                            <Text style={styles.indicatorLevelNormalText}>Normal</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.indicatorTableContainer}>
                    <View style={styles.indicatorTableTop}>
                        <View style={styles.indicatorLeftCircle}>
                            <Text style={styles.indicatorTableText}>Suhu</Text>
                            <View style={[styles.dangerIcon, { backgroundColor: calculateParameterColor(parameterStatuses.Suhu) }]}>
                                <Image source={require('../../../../assets/images/DangerIcon.png')} />
                            </View>
                        </View>
                        <View style={styles.indicatorMiddleContainer}>
                            <Text style={styles.indicatorTableText}>Kelembapan</Text>
                            <View style={[styles.warningIcon, { backgroundColor: calculateParameterColor(parameterStatuses.Kelembapan) }]}>
                                <Image source={require('../../../../assets/images/WarningIcon.png')} />
                            </View>
                        </View>
                        <View style={styles.indicatorRightContainer}>
                            <Text style={styles.indicatorTableText}>pH</Text>
                            <View style={[styles.normalIcon, { backgroundColor: calculateParameterColor(parameterStatuses.pH) }]}>
                                <Image source={require('../../../../assets/images/NormalIcon.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.dividerLine} />
                    <View style={styles.indicatorTableBottom}>
                        <View style={styles.indicatorLeftCircle}>
                            <Text style={styles.indicatorTableText}>Nitrogen</Text>
                            <View style={[styles.dangerIcon, { backgroundColor: calculateParameterColor(parameterStatuses.Nitrogen) }]}>
                                <Image source={require('../../../../assets/images/DangerIcon.png')} />
                            </View>
                        </View>
                        <View style={styles.indicatorMiddleBottomContainer}>
                            <Text style={styles.indicatorTableText}>Phosphor</Text>
                            <View style={[styles.warningIcon, { backgroundColor: calculateParameterColor(parameterStatuses.Phosphor) }]}>
                                <Image source={require('../../../../assets/images/WarningIcon.png')} />
                            </View>
                        </View>
                        <View style={styles.indicatorRightContainer}>
                            <Text style={styles.indicatorTableText}>Kalium</Text>
                            <View style={[styles.normalIcon, { backgroundColor: calculateParameterColor(parameterStatuses.Kalium) }]}>
                                <Image source={require('../../../../assets/images/NormalIcon.png')} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rentangNilaiContainer}>
                    <View style={styles.rentangNilaiLabel}>
                        <Text style={styles.rentangNilaiText}>Rentang Nilai</Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <Table>
                            <Rows data={tableData} style={styles.row} textStyle={styles.text} />
                        </Table>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.informasiRentangNilaiButton}
                    onPress={() => navigation.navigate('InformasiRentangNilaiScreen')}
                >
                    <Text style={styles.informasiRentangNilaiButtonText}>Informasi rentang nilai</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        width: wp('100%'),
    },
    indicatorContainer: {
        alignItems: 'center',
        marginTop: hp('5%')
    },
    indicatorCircle: {
        backgroundColor: Colors.WHITE,
        width: wp('55%'),
        height: hp('26%'),
        borderRadius: wp('100%'),
        borderWidth: wp('0.7%'),
        borderColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    indicatorText: {
        fontSize: wp('25%'),
        fontFamily: Fonts.light,
        color: Colors.PRIMARY,
        marginTop: hp('3%')
    },
    indicatorTextPercentage: {
        fontSize: wp('7%'),
        color: Colors.PRIMARY,
        marginTop: hp('1%'),
        fontFamily: Fonts.regular
    },
    indicatorLevelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
        marginVertical: hp('3%'),
    },
    indicatorLevelTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('1%')
    },
    indicatorLevelExtremeRectangle: {
        backgroundColor: Colors.RED,
        width: wp('6%'),
        height: hp('1%'),
        borderRadius: wp('10%')
    },
    indicatorLevelExtremeText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: Colors.RED
    },
    indicatorLevelSedangRectangle: {
        backgroundColor: Colors.WARNINGORANGE,
        width: wp('6%'),
        height: hp('1%'),
        borderRadius: wp('10%')
    },
    indicatorLevelSedangText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: Colors.DARKERWARNINGORANGE
    },
    indicatorLevelNormalRectangle: {
        backgroundColor: Colors.GREEN,
        width: wp('6%'),
        height: hp('1%'),
        borderRadius: wp('10%')
    },
    indicatorLevelNormalText: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        color: Colors.GREEN
    },
    indicatorTableContainer: {
        alignSelf: 'center',
        width: wp('90%'),
        height: hp('25%,'),
        borderWidth: wp('0.3%'),
        borderRadius: wp('3%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        justifyContent: 'center',
        marginBottom: hp('3.5%'),
    },
    indicatorTableTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: wp('5%')
    },
    dividerLine: {
        borderBottomWidth: wp('0.3%'),
        marginVertical: hp('1%'),
        color: Colors.PRIMARY
    },
    indicatorTableBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: wp('5%')
    },
    indicatorSuhuContainer: {},
    indicatorTableText: {
        fontFamily: Fonts.bold,
        fontSize: 11,
        color: Colors.PRIMARY
    },
    indicatorLeftCircle: {
        alignItems: 'center',
    },
    indicatorMiddleContainer: {
        alignItems: 'center',
        borderRightWidth: wp('0.3%'),
        borderRightColor: Colors.PRIMARY,
        borderLeftWidth: wp('0.3%'),
        borderLeftColor: Colors.PRIMARY,
        paddingHorizontal: wp('5%')
    },
    indicatorMiddleBottomContainer: {
        alignItems: 'center',
        borderRightWidth: wp('0.3%'),
        borderRightColor: Colors.PRIMARY,
        borderLeftWidth: wp('0.3%'),
        borderLeftColor: Colors.PRIMARY,
        paddingHorizontal: wp('7%')
    },
    indicatorRightContainer: {
        alignItems: 'center',

    },
    dangerIcon: {
        backgroundColor: Colors.RED,
        width: wp('14%'),
        height: hp('6.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('100%')
    },
    warningIcon: {
        backgroundColor: Colors.WARNINGORANGE,
        width: wp('14%'),
        height: hp('6.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('100%')
    },
    normalIcon: {
        backgroundColor: Colors.GREEN,
        width: wp('14%'),
        height: hp('6.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('100%')
    },
    rentangNilaiContainer: {
        alignSelf: 'center',
    },
    rentangNilaiLabel: {
        backgroundColor: Colors.PRIMARY,
        width: wp('35%'),
        height: hp('4%'),
        justifyContent: 'center',
        borderTopRightRadius: wp('4%'),
        paddingHorizontal: wp('3%'),
        elevation: 5,
    },
    rentangNilaiText: {
        fontFamily: Fonts.bold,
        fontSize: 12,
        color: Colors.WHITE,
    },
    tableContainer: {
        backgroundColor: Colors.WHITE,
        width: wp('90%'),
        height: hp('30%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
        borderTopRightRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
        elevation: 5,
        paddingTop: hp('1%')
    },
    row: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.PRIMARY,
    },
    informasiRentangNilaiButton: {
        alignSelf: 'flex-end',
        width: wp('35%'),
        marginRight: wp('4%'),
        marginBottom: hp('2%'),
        marginTop: hp('1%')
    },
    informasiRentangNilaiButtonText: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        color: Colors.PRIMARY,
        textDecorationLine: 'underline',
    },
});

export default KesuburanScreen