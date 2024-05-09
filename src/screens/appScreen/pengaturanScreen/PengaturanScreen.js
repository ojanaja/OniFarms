import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const PengaturanScreen = () => {
    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [userName, setUserName] = useState('');

    const user = firebase.auth().currentUser;
    const userRef = firestore().collection('users').doc(user.uid);

    userRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const userName = userData.name;
            setUserName(userData.name);
            console.log('User Name:', userName);
        } else {
            console.log('No such document!');
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.linearGradient}
                start={{ x: 0, y: -0.3 }} end={{ x: 0.9, y: 1.1 }}
                colors={['#E0F8F0', '#FFFFFF', '#9BD5B5']}
                locations={[0.1, 0.5, 1]}
            >
                <View style={styles.profileContainer}>
                    <View style={styles.profile}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            itemTextStyle={styles.itemTextStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Lahan 1' : 'Lahan 1'}
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            iconColor={Colors.PRIMARY}
                        />

                        <TouchableOpacity
                            style={styles.profilePicture}
                            onPress={() => { }}
                        >
                            <Image style={styles.profilePicturePlusIcon} source={require('../../../../assets/images/ProfilePlusIcon.png')} />
                            <Image style={styles.profilePictureImage} source={require('../../../../assets/images/ProfileIcon.png')} />
                        </TouchableOpacity>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>{userName}</Text>
                            <Text style={styles.profileEmail}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        style={styles.ButtonLinearGradient}
                        start={{ x: 0, y: 1.5 }} end={{ x: 0, y: 0.1 }}
                        colors={['#1B634D', '#B3CCC5']}
                        locations={[0.1, 1]}
                    >
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigation.navigate('MasaTanam')}
                        >
                            <Text style={styles.buttonText}>Masa tanam</Text>
                            <Octicons size={24} name="chevron-right" color={Colors.PRIMARY} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigation.navigate('JadwalPenyiraman')}
                        >
                            <Text style={styles.buttonText}>Jadwal penyiraman</Text>
                            <Octicons size={24} name="chevron-right" color={Colors.PRIMARY} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => navigation.navigate('DataRecord')}
                        >
                            <Text style={styles.buttonText}>Data record</Text>
                            <Octicons size={24} name="chevron-right" color={Colors.PRIMARY} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    linearGradient: {
        height: hp('100%'),
        width: wp('100%')
    },
    profileContainer: {},
    profile: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp('5%')
    },
    profilePicture: {
        width: wp('25%'),
        height: hp('11.5%'),
        borderRadius: wp('100%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.GREYPROFILE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePicturePlusIcon: {
        position: 'absolute',
        top: hp('9%'),
        left: wp('18%')
    },
    profilePictureImage: {
        width: 50,
        height: 50,
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: hp('1.5%'),
        gap: hp('0.5%')
    },
    profileName: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.PRIMARY,
    },
    profileEmail: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.PRIMARY,
    },
    buttonContainer: {
    },
    ButtonLinearGradient: {
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        height: hp('100%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%')
    },
    buttonStyle: {
        backgroundColor: Colors.WHITE,
        height: hp('5%'),
        marginVertical: hp('1.3%'),
        borderRadius: wp('3%'),
        paddingHorizontal: wp('3%'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: wp('0.3%'),
        borderColor: Colors.PRIMARY,
        elevation: 3
    },
    buttonText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.PRIMARY,
    },
    dropdown: {
        height: hp('4%'),
        width: wp('20%'),
        position: 'absolute',
        right: wp('7%'),
        top: hp('0.2%'),
    },
    label: {
        fontFamily: Fonts.semibold,
        fontSize: 11,
        color: Colors.PRIMARY,
    },
    placeholderStyle: {
        fontFamily: Fonts.semibold,
        fontSize: 11,
        color: Colors.PRIMARY,
    },
    selectedTextStyle: {
        fontFamily: Fonts.semibold,
        fontSize: 11,
        color: Colors.PRIMARY,
    },
    itemTextStyle: {
        fontFamily: Fonts.semibold,
        fontSize: 11,
        color: Colors.PRIMARY,
    },

});

export default PengaturanScreen