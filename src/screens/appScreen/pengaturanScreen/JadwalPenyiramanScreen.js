import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import ToggleSwitch from 'toggle-switch-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { TimerPickerModal } from 'react-native-timer-picker';

const JadwalPenyiramanScreen = () => {
    // State variables to manage toggle switches and timer picker modal visibility
    const [isOn, setIsOn] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [alarmString, setAlarmString] = useState(null);

    // Function to format time in HH:mm format
    const formatTime = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <Text style={styles.jadwalPenyiramanText}>Jadwal Penyiraman</Text>
                <View style={styles.jadwalPenyiramanContainer}>
                    <TouchableOpacity
                        style={styles.jadwalPenyiramanItem}
                        onPress={() => { }}
                    >
                        <Text style={styles.jadwalPenyiramanItemHours}>08.00</Text>
                        <Text style={styles.jadwalPenyiramanItemText}>Penyiraman 1</Text>
                    </TouchableOpacity>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="green"
                        offColor="red"
                        size="medium"
                        onToggle={() => setIsOn(!isOn)}
                        thumbOnStyle={{ backgroundColor: Colors.WHITE }}
                        thumbOffStyle={{ backgroundColor: Colors.GREY }}
                        trackOffStyle={{ backgroundColor: Colors.WHITE, borderColor: Colors.GREY, borderWidth: 1 }}
                        trackOnStyle={{ backgroundColor: Colors.PRIMARY }}
                        icon={<Feather name="x" size={16} color={Colors.WHITE} />}
                    />
                </View>
                <View style={[styles.jadwalPenyiramanContainer, { marginTop: hp('2%') }]}>
                    <TouchableOpacity
                        style={styles.jadwalPenyiramanItem}
                        onPress={() => { setShowPicker(true) }}
                    >
                        <Text style={styles.jadwalPenyiramanItemHours}>15.00</Text>
                        <Text style={styles.jadwalPenyiramanItemText}>Penyiraman 2</Text>
                    </TouchableOpacity>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor="green"
                        offColor="red"
                        size="medium"
                        onToggle={() => setIsOn(!isOn)}
                        thumbOnStyle={{ backgroundColor: Colors.WHITE }}
                        thumbOffStyle={{ backgroundColor: Colors.GREY }}
                        trackOffStyle={{ backgroundColor: Colors.WHITE, borderColor: Colors.GREY, borderWidth: 1 }}
                        trackOnStyle={{ backgroundColor: Colors.PRIMARY }}
                        icon={<Feather name="x" size={16} color={Colors.WHITE} />}
                    />
                </View>
                <TimerPickerModal
                    visible={showPicker}
                    setIsVisible={setShowPicker}
                    onConfirm={(pickedDuration) => {
                        setAlarmString(formatTime(pickedDuration));
                        setShowPicker(false);
                    }}
                    modalTitle="Set Alarm"
                    onCancel={() => setShowPicker(false)}
                    closeOnOverlayPress
                    LinearGradient={LinearGradient}
                    styles={{
                        theme: "light",
                        modalTitle: { fontSize: 18, fontFamily: Fonts.semibold, color: Colors.PRIMARY },
                        cancelButton: { fontSize: 13, fontFamily: Fonts.semibold, color: Colors.BLACK, textAlign: 'center', },
                        confirmButton: { fontSize: 13, fontFamily: Fonts.semibold, color: Colors.WHITE, backgroundColor: Colors.PRIMARY, textAlign: 'center', },
                    }}
                    modalProps={{
                        overlayOpacity: 0.5,
                    }}
                    hideSeconds={true}
                    minuteLabel="M"
                    hourLabel="J"
                />
            </LinearGradient>
        </View>
    )
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

export default JadwalPenyiramanScreen

