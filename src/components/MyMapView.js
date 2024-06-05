import React, { useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { Text, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyMapView = ({ onPress }) => {
    const [markers, setMarkers] = useState([
        {
            latitude: 51.5074,
            longitude: -0.1278,
            title: 'Location 1',
            description: 'This is a note about Location 1.',
        },
        {
            latitude: 51.5154,
            longitude: -0.1419,
            title: 'Location 2',
            description: 'This is a note about Location 2.',
        },
        {
            latitude: 51.5200,
            longitude: -0.1044,
            title: 'Location 3',
            description: 'This is a note about Location 3.',
        },
    ]);

    const initialRegion = {
        latitude: 51.5074,
        longitude: -0.1278,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={initialRegion}
            onPress={onPress}
        >
            <UrlTile
                urlTemplate="https://a.tile.openstreetmap.org/10/163/395.png"
                maximumZ={19}
                flipY={false}
            />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    }}
                >
                    <Callout>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{marker.title}</Text>
                            <Text style={styles.calloutSubtext}>{marker.description}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
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