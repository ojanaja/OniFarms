import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const DataRecordScreen = () => {
    const [scrollViewHeight, setScrollViewHeight] = useState(0);

    const scrollViewRef = useRef();

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((x, y, width, height) => {
                setScrollViewHeight(height);
            });
        }
    }, []);

    const tableHead = ['Tanggal', 'Suhu', 'Kelembapan', 'pH', 'N', 'P', 'K'];
    const tableData = [
        ['2024-01-01', '25°C', '70%', '7.0', '10', '5', '15'],
        ['2024-01-02', '26°C', '72%', '7.2', '12', '6', '16'],
        ['2024-01-03', '24°C', '68%', '6.8', '9', '4', '14'],
        ['2024-01-04', '23°C', '65%', '6.5', '8', '3', '13'],
        ['2024-01-05', '27°C', '75%', '7.5', '14', '7', '17'],
        ['2024-01-06', '26°C', '72%', '7.2', '12', '6', '16'],
        ['2024-01-07', '25°C', '70%', '7.0', '10', '5', '15'],
    ];


    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
        >
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <Text style={styles.dataRecordText}>Data Record</Text>
                <View style={styles.dateContainer}>
                    <View style={styles.dateButtonContainer}>
                        <Text style={styles.dateText}>Dari :</Text>
                        <TouchableOpacity style={styles.dateButton}><Text style={styles.dateButtonText}>30/12/24</Text></TouchableOpacity>
                    </View>
                    <View style={styles.dateButtonContainer}>
                        <Text style={styles.dateText}>Sampai :</Text>
                        <TouchableOpacity style={styles.dateButton}><Text style={styles.dateButtonText}>30/12/24</Text></TouchableOpacity>
                    </View>
                </View>
                <Table style={styles.tableStyle} borderStyle={{ borderWidth: wp('0.3%'), borderColor: Colors.PRIMARY }}>
                    <Row data={tableHead} style={styles.headTable} textStyle={styles.headText} />
                    <Rows data={tableData} textStyle={styles.textTable} />
                </Table>
                <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadButtonText}>Download as pdf</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        height: hp('100%'),
        width: wp('100%'),
    },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%'),
    },
    dataRecordText: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginVertical: hp('3%'),
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
    },
    dateButtonContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    dateButton: {
        borderWidth: wp('0.2%'),
        borderColor: Colors.BLACK,
        backgroundColor: Colors.WHITE,
        borderRadius: wp('2.5%'),
        width: wp('20%'),
        height: hp('3.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('0.2%'),
    },
    dateText: {
        fontFamily: Fonts.regular,
        fontSize: 11,
        color: Colors.BLACK,
    },
    dateButtonText: {
        fontFamily: Fonts.regular,
        fontSize: 11,
        color: Colors.BLACK,
    },
    tableStyle: {
        marginVertical: hp('2%'),
        width: wp('90%'),
        alignSelf: 'center',
        borderRadius: wp('0.3%'),
    },
    headTable: {
        height: hp('3.5%'),
        backgroundColor: Colors.PRIMARY,
    },
    headText: {
        fontFamily: Fonts.regular,
        fontSize: 11,
        color: Colors.WHITE,
        textAlign: 'center',
    },
    textTable: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        color: Colors.BLACK,
        textAlign: 'center'
    },
    downloadButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: wp('3%'),
        width: wp('32%'),
        height: hp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: hp('2%'),
    },
    downloadButtonText: {
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
        fontSize: 12,
    },
});

export default DataRecordScreen;

