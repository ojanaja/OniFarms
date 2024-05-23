import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { addAlarm } from '../actions/alarms';
import PushNotification, { Importance } from 'react-native-push-notification';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { TimerPickerModal } from 'react-native-timer-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TimePicker = (props) => {
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
    const [id, setId] = useState(0);

    useEffect(() => {
        createChannels();
    }, []);

    const generateId = () => {
        const newId = id + 1;
        setId(newId);
        return newId;
    };

    const createChannels = () => {
        PushNotification.createChannel({
            channelId: 'alarm-channel',
            channelName: 'Alarm Channel',
        });
    };

    const showDateTimePicker = () => {
        setIsDateTimePickerVisible(true);
    }

    const hideDateTimePicker = () => {
        setIsDateTimePickerVisible(false);
    }

    const formatTime = (hours, minutes) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const handleDatePicker = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const now = new Date();
        const dateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

        if (dateTime.getTime() < Date.now()) {
            Alert.alert('Please choose future time');
            hideDateTimePicker();
            return;
        }

        const fireDate = dateTime;

        const alarmNotifData = {
            channelId: 'alarm-channel',
            ticker: 'My Notification Message',
            id: generateId(),
            title: 'Alarm Ringing',
            message: "Message Here",
            autoCancel: true,
            vibrate: true,
            vibration: 100,
            smallIcon: 'ic_launcher',
            largeIcon: 'ic_launcher',
            playSound: true,
            color: 'red',
            fire_date: fireDate,
            date: { value: dateTime }
        };

        props.add(alarmNotifData);
        console.log('ID: ' + alarmNotifData.id);

        PushNotification.localNotificationSchedule({
            channelId: 'alarm-channel',
            title: alarmNotifData.title,
            id: alarmNotifData.id,
            message: alarmNotifData.message,
            date: alarmNotifData.fire_date,
            actions: ['Snooze', 'Stop Alarm'],
            importance: Importance.HIGH,
            playSound: true,
            allowWhileIdle: true,
            invokeApp: false,
        });

        PushNotification.configure({
            onAction: function (notification) {
                if (notification.action === 'Snooze') {
                    console.log('Alarm ' + notification.id + ' Snoozed');
                    console.log('Alarm ID: ' + notification.id);

                    PushNotification.localNotificationSchedule({
                        channelId: "alarm-channel",
                        title: notification.title,
                        id: notification.id,
                        message: notification.message,
                        date: new Date(Date.now() + 2 * 1000),
                        actions: ['Snooze', 'Stop Alarm'],
                        importance: Importance.HIGH,
                        playSound: true,
                        allowWhileIdle: true,
                        invokeApp: false,
                    });
                } else if (notification.action === 'Stop Alarm') {
                    console.log('Alarm ' + notification.id + ' Stopped');
                    PushNotification.cancelLocalNotification(notification.id);
                } else {
                    console.log('Notification opened');
                }
            },
            actions: ['Snooze', 'Stop Alarm'],
        });

        hideDateTimePicker();
    }

    return (
        <>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                    showDateTimePicker();
                    console.log('ShowDateTime');
                }}>
                <Text style={styles.buttonText}>Tambahkan Alarm</Text>
            </TouchableOpacity>
            <TimerPickerModal
                visible={isDateTimePickerVisible}
                onConfirm={(pickedDuration) => {
                    if (pickedDuration && typeof pickedDuration === 'object') {
                        const { hours, minutes } = pickedDuration;
                        const formattedTime = formatTime(hours, minutes);
                        handleDatePicker(formattedTime);
                    }
                }}
                onCancel={hideDateTimePicker}
                closeOnOverlayPress
                modalTitle="Set Alarm Penyiraman 2"
                styles={{
                    theme: "light",
                    modalTitle: { fontSize: 18, fontFamily: Fonts.semibold, color: Colors.PRIMARY },
                    cancelButton: { fontSize: 13, fontFamily: Fonts.semibold, color: Colors.BLACK, textAlign: 'center' },
                    confirmButton: { fontSize: 13, fontFamily: Fonts.semibold, color: Colors.WHITE, backgroundColor: Colors.PRIMARY, textAlign: 'center' },
                }}
                modalProps={{
                    overlayOpacity: 0.5,
                }}
                hideSeconds={true}
                minuteLabel="M"
                hourLabel="J"
            />
        </>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: wp('4%'),
        paddingHorizontal: wp('7.5%'),
        paddingVertical: hp('1%'),
        marginVertical: hp('15%'),
        width: wp('50%'),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: Colors.WHITE,
        fontFamily: Fonts.regular,
    }
});

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        add: alarmNotifData => {
            dispatch(addAlarm(alarmNotifData))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
