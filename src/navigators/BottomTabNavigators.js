import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MonitoringScreen from '../screens/appScreen/monitoringScreen/MonitoringScreen';
import NotifikasiScreen from '../screens/appScreen/notifikasiScreen/NotifikasiScreen';
import KesuburanScreen from '../screens/appScreen/kesuburanScreen/KesuburanScreen';
import PengaturanScreen from '../screens/appScreen/pengaturanScreen/PengaturanScreen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import { Text } from 'react-native-svg';

const monitoringIcon = require('../../assets/images/MonitoringInactive.png');
const notifikasiIcon = require('../../assets/images/NotifikasiInactive.png');
const kesuburanIcon = require('../../assets/images/KesuburanInactive.png');
const pengaturanIcon = require('../../assets/images/PengaturanInactive.png');

const Tab = createBottomTabNavigator();

const BottomTabNavigators = () => {
    return (
        <Tab.Navigator
            initialRouteName="Monitoring"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: styles.headerTitleStyle,
                headerStyle: styles.headerStyle,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarInactiveTintColor: Colors.PRIMARY,
                tabBarActiveTintColor: Colors.WHITE,
                tabBarActiveBackgroundColor: Colors.PRIMARY,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarIconStyle: { width: 10 },
            }}
        >
            <Tab.Screen
                name="Monitoring"
                component={MonitoringScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={monitoringIcon} style={{ width: size * 1.1, height: size * 1, tintColor: color }} />
                    )
                }}
            />
            <Tab.Screen
                name="Notifikasi"
                component={NotifikasiScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Image source={notifikasiIcon} style={{ width: size * 0.85, height: size * 1, tintColor: color }} />
                            <View style={styles.badge}>
                                {/* <Text style={styles.badgeText}>10</Text> */}
                            </View>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Kesuburan"
                component={KesuburanScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={kesuburanIcon} style={{ width: size * 0.95, height: size * 1, tintColor: color }} />
                    )
                }}
            />
            <Tab.Screen
                name="Pengaturan"
                component={PengaturanScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={pengaturanIcon} style={{ width: size * 0.85, height: size * 1, tintColor: color }} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        borderBottomLeftRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
        borderEndWidth: wp('0.3%'),
        borderStartWidth: wp('0.3%'),
        borderBottomWidth: wp('0.3%'),
        borderBottomColor: Colors.PRIMARY,
        borderStartColor: Colors.PRIMARY,
        borderEndColor: Colors.PRIMARY,
    },
    headerTitleStyle: {
        fontFamily: Fonts.bold,
        color: Colors.PRIMARY
    },
    tabBarStyle: {
        borderTopWidth: wp('0.3%'),
        borderTopColor: Colors.PRIMARY,
        paddingHorizontal: wp('1%')
    },
    tabBarItemStyle: {
        borderRadius: wp('3%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    badge: {
        width: wp('3%'),
        height: wp('3%'),
        borderRadius: wp('5%'),
        backgroundColor: Colors.RED,
        position: 'absolute',
        top: hp('-1%'),
        right: wp('-3%'),
        alignItems: 'center',
    },
    badgeText: {
        color: Colors.WHITE,
        fontFamily: Fonts.bold,
        fontSize: 10,
    },
})

export default BottomTabNavigators;
