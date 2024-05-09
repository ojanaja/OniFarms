import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import KesuburanScreen from '../screens/appScreen/kesuburanScreen/KesuburanScreen';
import MonitoringScreen from '../screens/appScreen/monitoringScreen/MonitoringScreen';
import NotifikasiScreen from '../screens/appScreen/notifikasiScreen/NotifikasiScreen';
import PengaturanScreen from '../screens/appScreen/pengaturanScreen/PengaturanScreen';
import JadwalPenyiramanScreen from '../screens/appScreen/pengaturanScreen/JadwalPenyiramanScreen';
import DataRecordScreen from '../screens/appScreen/pengaturanScreen/DataRecordScreen';
import MasaTanamScreen from '../screens/appScreen/pengaturanScreen/MasaTanamScreen';
import BottomTabNavigators from './BottomTabNavigators';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import LoginScreen from '../screens/authScreen/LoginScreen';
import RegisterScreen from '../screens/authScreen/RegisterScreen';

const Stack = createStackNavigator();
const MainStackNavigators = () => {
    return (
        <Stack.Navigator initialRouteName="BottomTab">
            <Stack.Group>
                <Stack.Screen
                    name="BottomTab"
                    component={BottomTabNavigators}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="KesuburanScreen" component={KesuburanScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="MonitoringScreen" component={MonitoringScreen} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="NotifikasiScreen" component={NotifikasiScreen} />
            </Stack.Group>
            <Stack.Group
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="PengaturanScreen" component={PengaturanScreen} />
                <Stack.Screen
                    name="JadwalPenyiraman"
                    component={JadwalPenyiramanScreen}
                    options={{
                        headerTitle: 'Pengaturan',
                        headerTitleAlign: 'center',
                        headerTitleStyle: styles.headerTitleStyle,
                        headerStyle: styles.headerStyle,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.PRIMARY,
                    }}
                />
                <Stack.Screen
                    name="DataRecord"
                    component={DataRecordScreen}
                    options={{
                        headerTitle: 'Pengaturan',
                        headerTitleAlign: 'center',
                        headerTitleStyle: styles.headerTitleStyle,
                        headerStyle: styles.headerStyle,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.PRIMARY
                    }}
                />
                <Stack.Screen
                    name="MasaTanam"
                    component={MasaTanamScreen}
                    options={{
                        headerTitle: 'Pengaturan',
                        headerTitleAlign: 'center',
                        headerTitleStyle: styles.headerTitleStyle,
                        headerStyle: styles.headerStyle,
                        headerBackTitleVisible: false,
                        headerTintColor: Colors.PRIMARY
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
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
});

export default MainStackNavigators