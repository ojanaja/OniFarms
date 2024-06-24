import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { notificationStore } from '../../../store/notificationStore';

const NotifikasiScreen = () => {
    const { notifications, addNotification, setNotifications, removeAllNotifications, saveNotifications, loadNotifications } = notificationStore();

    // Function to load notifications from AsyncStorage
    useEffect(() => {
        const initializeNotifications = async () => {
            await loadNotifications();
            await markAllAsRead();
        };

        initializeNotifications();
    }, []);

    useEffect(() => {
        const requestUserPermission = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        };

        const handleForegroundMessage = async (remoteMessage) => {
            const newNotification = formatNotification(remoteMessage);
            addNotification(newNotification);
            saveNotifications([...notifications, newNotification]);
        };

        const handleBackgroundMessage = async (remoteMessage) => {
            const newNotification = formatNotification(remoteMessage);
            addNotification(newNotification);
            saveNotifications([...notifications, newNotification]);
        };

        requestUserPermission();

        const unsubscribeForeground = messaging().onMessage(handleForegroundMessage);
        const unsubscribeBackground = messaging().onNotificationOpenedApp(handleBackgroundMessage);
        messaging().getInitialNotification().then(handleBackgroundMessage);

        return () => {
            unsubscribeForeground();
            unsubscribeBackground();
        };
    }, [notifications]);

    // Function to format the notification
    const formatNotification = (remoteMessage) => {
        const now = new Date();
        const formattedTime = now.toTimeString().split(' ')[0]; // Extract HH:MM:SS
        const formattedDate = now.toLocaleDateString(); // Extract MM/DD/YYYY
        return { ...remoteMessage, time: formattedTime, date: formattedDate };
    };

    // Function to mark all notifications as read
    const markAllAsRead = async () => {
        await removeAllNotifications();
        setNotifications([]);
    };

    const renderItem = ({ item }) => {
        let iconSource = require('../../../../assets/images/MenyiramIcon.png');
        let badgeStyle = styles.badgeContainer;

        // Change icon and style based on the category
        switch (item.data.category) {
            case 'menyiram':
                iconSource = require('../../../../assets/images/MenyiramIcon.png');
                badgeStyle = { ...styles.badgeContainer };
                break;
            case 'pH':
                iconSource = require('../../../../assets/images/PhIcon.png');
                badgeStyle = { ...styles.badgeContainer };
                break;
            case 'suhu':
                iconSource = require('../../../../assets/images/SuhuIcon.png');
                badgeStyle = { ...styles.badgeContainer };
                break;
            default:
                break;
        }

        return (
            <View style={badgeStyle}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={iconSource} />
                </View>
                <View style={styles.DescContainer}>
                    <Text style={styles.title}>{item.notification.title}</Text>
                    <Text style={styles.subTitle}>{item.notification.body}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient
            style={styles.linearGradient}
            start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
            colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
            locations={[0.1, 0.5, 1]}
        >
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingBottom: hp('2%')
    },
    linearGradient: {
        flex: 1,
        paddingTop: hp('2%'),
    },
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
        alignItems: 'center',
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