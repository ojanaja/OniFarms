import { View, Text, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const MyMapView = () => {
    const [pinPointData] = useState({
        latitude: 51.5074,
        longitude: -0.1278,
        title: 'Your Location Name',
        description: 'This is a note about the location.',
    });

    const initialRegion = {
        latitude: pinPointData.latitude,
        longitude: pinPointData.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
        >
            <Marker
                coordinate={{
                    latitude: pinPointData.latitude,
                    longitude: pinPointData.longitude,
                }}
                title={pinPointData.title}
            >
                <Callout>
                    <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{pinPointData.title}</Text>
                        <Text style={styles.calloutSubtext}>{pinPointData.description}</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
};

const MonitoringScreen = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const tableData = [
        ['Suhu', ':', '25 - 30 C'],
        ['Kelembapan', ':', '65 - 80 %'],
        ['pH', ':', '5 - 8'],
        ['Nitrogen', ':', '100 - 200ppm'],
        ['Phosphor', ':', '100 - 200ppm'],
        ['Kalium', ':', '100 - 200ppm'],
    ];

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            overScrollMode="auto"
        >
            <ImageBackground
                source={require('../../../../assets/images/Background.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.locationContainer}>
                        <Entypo name="location-pin" size={25} color={Colors.RED} />
                        <Text style={styles.locationText}>Mijen, Demak</Text>
                    </View>
                    <View style={styles.dayAgeContainer}>
                        <Image source={require('../../../../assets/images/DayIcon.png')} />
                        <View style={styles.ageContainer}>
                            <Text style={styles.ageText}>Usia tanam: </Text>
                            <Text style={styles.ageDate}>80 <Text style={styles.ageText}>hari</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.chartContainer}>
                    <View style={styles.chartTop}>
                        <View style={[styles.chart, { paddingRight: wp('9%'), borderRightColor: Colors.WHITE, borderRightWidth: 1 }]}>
                            <View style={[styles.chartIcon, { gap: wp('8%') }]}>
                                <Image source={require('../../../../assets/images/SuhuIconWhite.png')} />
                                <Text style={styles.chartText}>Suhu</Text>
                            </View>
                            <View style={styles.chartValue}>
                                <Text style={styles.chartPercentText}>°C</Text>
                                <Text style={styles.chartValueText}>30</Text>
                            </View>
                        </View>
                        <View style={[styles.chart, { paddingRight: wp('1%') }]}>
                            <View style={[styles.chartIcon, { gap: wp('3%') }]}>
                                <Image source={require('../../../../assets/images/KelembapanIconWhite.png')} />
                                <Text style={styles.chartText}>kelembapan</Text>
                            </View>
                            <View style={styles.chartValue}>
                                <Text style={styles.chartPercentText}>%</Text>
                                <Text style={styles.chartValueText}>85</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.chartBottom}>
                        <View style={[styles.chart, { paddingRight: wp('9%'), paddingTop: hp('1%'), borderRightColor: Colors.WHITE, borderRightWidth: 1 }]}>
                            <View style={[styles.chartIcon, { gap: wp('8%') }]}>
                                <Image source={require('../../../../assets/images/pHIconWhite.png')} />
                                <Text style={styles.chartText}>pH</Text>
                            </View>
                            <View style={styles.chartValue}>
                                <Text style={styles.chartValueText}>7</Text>
                            </View>
                        </View>
                        <View style={[styles.chart, { paddingRight: wp('1%'), paddingTop: hp('1%') }]}>
                            <View style={[styles.chartIcon, { gap: wp('5%') }]}>
                                <Image source={require('../../../../assets/images/NPKIconWhite.png')} />
                                <Text style={styles.chartText}>NPK</Text>
                            </View>
                            <View style={styles.kaliumContainer}>
                                <Text style={styles.kaliumText}>Kalium</Text>
                                <View style={styles.threeChartValue}>
                                    <Text style={styles.threeChartValueText}>3200</Text>
                                </View>
                            </View>
                            <View style={styles.nitrogenPhosphorContainer}>
                                <View style={styles.kaliumContainer}>
                                    <Text style={styles.kaliumText}>Nitrogen</Text>
                                    <View style={styles.threeChartValue}>
                                        <Text style={styles.threeChartValueText}>3200</Text>
                                    </View>
                                </View>
                                <View style={styles.kaliumContainer}>
                                    <Text style={styles.kaliumText}>Phosphor</Text>
                                    <View style={styles.threeChartValue}>
                                        <Text style={styles.threeChartValueText}>3200</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.nodeMonitorContainer}>
                <LinearGradient
                    style={styles.linearGradient}
                    start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                    colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                    locations={[0.1, 0.5, 1]}
                >
                    <View style={styles.nodeMonitorHeader}>
                        <Text style={styles.nodeMonitorText}>Monitor per Bendengan</Text>
                    </View>
                    <MyMapView />
                    <View style={styles.accordionContainer}>
                        <Collapse
                            onToggle={toggleCollapse}
                            isExpanded={isOpen}
                        >
                            <CollapseHeader style={[styles.accordionHeader, isOpen && { borderBottomRightRadius: 0 }]}>
                                <View style={styles.accordionHeaderContainer}>
                                    <Text style={styles.accordionHeaderText}>Bendengan 1</Text>
                                    <FontAwesome6 name="angle-down" color={Colors.WHITE} size={20} />
                                </View>
                            </CollapseHeader>
                            <CollapseBody style={styles.accordionBody}>
                                <View>
                                    <Table>
                                        <Rows data={tableData} style={styles.row} textStyle={styles.text} />
                                    </Table>
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
                </LinearGradient>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        width: wp('100%'),
    },
    backgroundImage: {
        height: hp('80%'),
        width: wp('100%'),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: wp('100%'),
        alignSelf: 'center',
        marginVertical: hp('2%')
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.BLACK,
    },
    dayAgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: wp('17%'),
    },
    ageContainer: {},
    ageText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.BLACK,
    },
    ageDate: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        color: Colors.BLACK,
    },
    chartContainer: {
        width: wp('90%'),
        height: hp('50%'),
        alignSelf: 'center',
        backgroundColor: Colors.SECONDARY,
        borderRadius: wp('4%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
    },
    chartTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chartBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Colors.WHITE,
    },
    chart: {
    },
    chartIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chartText: {
        fontFamily: Fonts.semibold,
        fontSize: 13,
        color: Colors.WHITE,
    },
    chartValue: {
        backgroundColor: Colors.GREYPROFILE,
        borderRadius: wp('100%'),
        width: wp('31%'),
        height: hp('14.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    chartPercentText: {
        position: 'absolute',
        top: hp('1%'),
        left: wp('29%'),
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.WHITE,
    },
    chartValueText: {
        fontFamily: Fonts.regular,
        fontSize: 45,
        marginTop: hp('1%'),
        color: Colors.BLACK,
    },
    kaliumContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    threeChartValue: {
        backgroundColor: Colors.GREYPROFILE,
        borderRadius: wp('100%'),
        width: wp('13%'),
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('1%'),
    },
    nitrogenPhosphorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('35%'),
    },
    kaliumText: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        color: Colors.WHITE,
    },
    threeChartValueText: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        color: Colors.BLACK,
    },
    linearGradient: {
        marginTop: hp('-2%'),
        height: hp('100%'),
        width: wp('100%'),
        borderTopRightRadius: wp('4%'),
        borderTopLeftRadius: wp('4%'),
    },
    nodeMonitorHeader: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
    },
    nodeMonitorText: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.PRIMARY,
    },
    map: {
        width: wp('100%'),
        height: hp('30%'),
    },
    accordionContainer: {
        marginVertical: hp('3%'),
    },
    accordionHeader: {
        backgroundColor: Colors.PRIMARY,
        width: wp('90%'),
        height: hp('4%'),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('3%'),
        borderTopRightRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
        elevation: 5,
    },
    accordionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionHeaderText: {
        fontFamily: Fonts.semibold,
        fontSize: 12,
        color: Colors.WHITE,
    },
    accordionBody: {
        backgroundColor: Colors.WHITE,
        width: wp('90%'),
        height: 'auto',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp('3%'),
        borderBottomRightRadius: wp('5%'),
        elevation: 5,
    },
    row: {
        paddingHorizontal: wp('1%'),
        paddingVertical: hp('1%'),
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: Colors.PRIMARY,
    },
    calloutContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    calloutText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    calloutSubtext: {
        fontSize: 14,
    },
});

export default MonitoringScreen;

