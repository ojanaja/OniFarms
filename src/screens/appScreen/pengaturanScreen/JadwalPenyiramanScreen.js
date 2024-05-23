import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import PushNotification, { Importance } from 'react-native-push-notification';
import ListAlarms from '../../../components/ListAlarms';
import TimePicker from '../../../components/TimePicker';
import { PermissionsAndroid, Platform } from 'react-native';

class JadwalPenyiramanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.createChannels();
        this.requestNotificationPermission();
    }

    requestNotificationPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        }
    };

    createChannels = () => {
        PushNotification.createChannel({
            channelId: 'alarm-channel',
            channelName: 'Alarm Channel',
            channelDescription: 'A channel to categorise your notifications',
        });
    };

    handleNotification = () => {

        PushNotification.cancelAllLocalNotifications();


        PushNotification.localNotificationSchedule({
            channelId: 'test-channel',
            title: 'Alarm Ringing',

            message: 'Message Here',
            actions: ['Accept', 'Reject'],
            date: new Date(Date.now() + 100),
            allowWhileIdle: true,
            invokeApp: false,

            //repeatTime: 2,
        });

        PushNotification.configure({
            onAction: function (notification) {
                if (notification.action === 'Accept') {
                    console.log('Alarm Snoozed');
                }
                else if (notification.action === 'Reject') {
                    console.log('Alarm Stoped');
                    //PushNotification.cancelAllLocalNotifications();
                }
                else {
                    console.log('Notification opened');
                }
            },
            actions: ["Accept", 'Reject'],
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={styles.linearGradient}
                    start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                    colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                    locations={[0.1, 0.5, 1]}
                >
                    <Text style={styles.jadwalPenyiramanText}>Jadwal Penyiraman</Text>
                    <ListAlarms />
                    <TimePicker />
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%'),
    },
    jadwalPenyiramanText: {
        fontFamily: Fonts.semibold,
        fontSize: 16,
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginVertical: hp('3%'),
    },
});

export default JadwalPenyiramanScreen;
