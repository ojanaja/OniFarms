import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MyMapView from '../../../components/MyMapView';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const MapViewScreen = () => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    const handleMapPress = () => {
        setIsTextVisible(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {isTextVisible && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Tap lokasi untuk melihat hasil monitoring</Text>
                </View>
            )}
            <MyMapView onPress={handleMapPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    text: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        fontFamily: Fonts.medium,
        borderRadius: 5,
        fontSize: 12,
        color: Colors.BLACK,
    },
});

export default MapViewScreen;
