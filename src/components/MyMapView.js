import { useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyMapView = ({ onPress }) => {
    const [pinPointData] = useState({
        latitude: 51.5074,
        longitude: -0.1278,
        title: 'Your Location Name',
        description: 'This is a note about the location.',
    });

    const initialRegion = {
        latitude: pinPointData.latitude,
        longitude: pinPointData.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
            onPress={onPress}
        >
            <Marker
                coordinate={{
                    latitude: pinPointData.latitude,
                    longitude: pinPointData.longitude,
                }}
            >
                <Callout>
                    <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{pinPointData.title}</Text>
                        <Text style={styles.calloutSubtext}>{pinPointData.description}</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: wp('100%'),
        height: hp('100%'),
    },
    calloutContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: wp('80%'),
    },
    calloutText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    calloutSubtext: {
        fontSize: 14,
    },
});

export default MyMapView;
