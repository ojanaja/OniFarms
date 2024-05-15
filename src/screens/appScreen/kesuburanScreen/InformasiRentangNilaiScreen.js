import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const InformasiRentangNilaiScreen = () => {
    const tableHead = ['', 'Rendah', 'Normal', 'Tinggi'];
    const tableTitle = ['Suhu (C)', 'Kelembapan (%)', 'pH', 'N (ppm)', 'P (ppm)', 'K (ppm)'];
    const tableData = [
        ['<25', '25-32', '>32'],
        ['0 - 50', '50 - 70', '70 - 100'],
        ['0 - 5.6', '5.6 - 6.5', '6.5 - 14'],
        ['0 - 155', '155 - 250', '>250'],
        ['0 - 6.1', '6.1 - 12.2', '>12.2'],
        ['0 - 65.5', '65.5 - 155.5', '>155.5'],
    ];
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <Table style={styles.table} borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={tableTitle} style={styles.title} textStyle={styles.text} />
                        <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
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
    head: { height: hp('3%'), backgroundColor: Colors.YELLOW },
    wrapper: { flexDirection: 'row' },
    title: {
        height: hp('25%'),
        backgroundColor: Colors.LABELINPUTCOLOR,
    },
    row: {
        height: hp('4.16%'),
        backgroundColor: Colors.WHITE,
    },
    text: {
        textAlign: 'center',
        color: Colors.BLACK,
        fontFamily: Fonts.medium,
        fontSize: 11,
    },
    table: {
        width: wp('95%'),
        alignSelf: 'center',
        marginVertical: hp('5%')
    }
});
export default InformasiRentangNilaiScreen