import React, { useState } from 'react'
import {
    View,
    Pressable,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux';
import { deleteAlarm } from "../actions/alarms";
import PushNotification from 'react-native-push-notification';
import ToggleSwitch from 'toggle-switch-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const ListAlarms = (props) => {
    const [isOn, setIsOn] = useState(true);
    const keyExtractor = (item, index) => index.toString();
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.jadwalPenyiramanContainer}>
                <TouchableOpacity
                    style={styles.jadwalPenyiramanItem}
                    onPress={() => { this.setState({ showPicker1: true }) }}
                >
                    <Text style={styles.jadwalPenyiramanItemHours}>{item.time.toString()}</Text>
                    <Text style={styles.jadwalPenyiramanItemText}>{`Penyiraman ${index + 1}`}</Text>
                </TouchableOpacity>
                <ToggleSwitch
                    isOn={isOn}
                    onColor="green"
                    offColor="red"
                    size="medium"
                    onToggle={() => [
                        PushNotification.cancelLocalNotification(item.alarmNotifData.id),
                        props.delete(item.value),
                        console.log('Alarm Deleted with ID: ' + item.alarmNotifData.id),
                    ]}
                    thumbOnStyle={{ backgroundColor: Colors.WHITE }}
                    thumbOffStyle={{ backgroundColor: Colors.GREY }}
                    trackOffStyle={{ backgroundColor: Colors.WHITE, borderColor: Colors.GREY, borderWidth: 1 }}
                    trackOnStyle={{ backgroundColor: Colors.PRIMARY }}
                    icon={<Feather name="x" size={16} color={Colors.WHITE} />}
                />
            </View>
        );
    };

    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={props.alarms}
            renderItem={renderItem} />
    );
}

const styles = StyleSheet.create({
    jadwalPenyiramanContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: wp('3.5%'),
        paddingVertical: hp('2%'),
        borderRadius: wp('3.5%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
        width: wp('90%'),
        height: hp('12%'),
        marginVertical: hp('1%')
    },
    jadwalPenyiramanItem: {},
    jadwalPenyiramanItemHours: {
        fontFamily: Fonts.medium,
        fontSize: 24,
        color: Colors.PRIMARY,
        marginBottom: hp('-0.5%'),
    },
    jadwalPenyiramanItemText: {
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.PRIMARY,
    },
});

const mapStateToProps = state => {
    return {
        alarms: state.alarms.alarms,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        delete: value => {
            dispatch(deleteAlarm(value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAlarms);
