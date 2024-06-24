import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNSecureStorage from 'rn-secure-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

// Data for dropdown menu
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
    const [value, setValue] = useState(null); // State for dropdown value
    const [isFocus, setIsFocus] = useState(false); // State to track focus state of dropdown
    const [userName, setUserName] = useState(''); // State to store user's name
    const [profileImage, setProfileImage] = useState(require('../../../../assets/images/ProfileIcon.png'));

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleImagePicker = async () => {
        if (Platform.OS === 'android') {
            const cameraPermission = await requestCameraPermission();
            if (!cameraPermission) {
                Alert.alert('Camera permission denied');
                return;
            }
        }

        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setProfileImage(source);
                await uploadImageToFirebase(response.assets[0]);
            }
        });
    };

    const uploadImageToFirebase = async (image) => {
        if (!image.uri) { return; }

        const user = firebase.auth().currentUser;
        const imagePath = `profile_images/${user.uid}/${Date.now()}_${image.fileName}`;
        const reference = storage().ref(imagePath);

        try {
            await reference.putFile(image.uri);
            const url = await reference.getDownloadURL();
            await firestore().collection('users').doc(user.uid).update({ profileImageUrl: url });
            console.log('Image uploaded and URL saved to Firestore:', url);
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };


    const user = firebase.auth().currentUser;

    // Fetching user data from Firestore
    useEffect(() => {
        const userRef = firestore().collection('users').doc(user.uid);

        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                setUserName(userData.name);
            } else {
                console.log('No such document!');
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    });

    // Function to handle sign out
    const handleSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                navigation.navigate('LoginScreen');
                // Remove auth token from secure storage
                RNSecureStorage.removeItem('authToken').then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            });
    };


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
                            onPress={handleImagePicker}
                        >
                            <Image style={styles.profilePicturePlusIcon} source={require('../../../../assets/images/ProfilePlusIcon.png')} />
                            <Image style={styles.profilePictureImage} source={profileImage} />
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
                        <TouchableOpacity
                            style={styles.logOutbuttonStyle}
                            onPress={handleSignOut}
                        >
                            <Text style={[styles.buttonText, { textDecorationLine: 'underline', fontFamily: Fonts.bold, fontSize: 14 }]}>Logout</Text>
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
    logOutbuttonStyle: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        height: hp('30%'),
    },

});

export default PengaturanScreen