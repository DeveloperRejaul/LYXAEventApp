import { StyleSheet, Text, View, ScrollView, Linking, Platform, Image } from 'react-native';
import React from 'react';
import Header from '@src/core/components/Header';
import { ScreenType } from '@src/core/utils/types';
import MapView, { Marker } from 'react-native-maps';
import { formatDate } from '@src/core/utils/date-time';
import Button from '@src/core/components/button';
import { colors } from '@src/core/constants/color';

export default function DetailsScreen(props: ScreenType<'details'>) {
  const { event } = props.route.params;

  const image = event.images?.[0]?.url;
  const venue = event?._embedded?.venues?.[0];
  const location = venue?.location;

  const latitude = parseFloat(location?.latitude || '0');
  const longitude = parseFloat(location?.longitude || '0');
  const date = formatDate( event.dates?.start?.localDate, event.dates?.start?.localTime);

  const openTicket = () => {
    if (event.url) {
      Linking.openURL(event.url);
    }
  };

 
  return (
    <View style={styles.container}>
      <Header title="Event Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Image */}
        <Image
          source={{uri:image }}
          style={styles.image}
        />

        {/* Title */}
        <Text style={styles.title}>{event.name}</Text>

        {/* Date */}
        <Text style={styles.text}> {date}</Text>

        {/* Venue */}
        <Text style={styles.text}>
          {venue?.name}, {venue?.city?.name}
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          {event.info || 'No description available'}
        </Text>

        {/* Map */}
        {latitude && longitude  && Platform.OS === 'ios' ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
        ) : null}

        {/* Ticket Button */}
        <Button onPress={openTicket} title="Buy Ticket" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  text: {
    fontSize: 14,
    color: colors.black,
    marginTop: 5,
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },

  map: {
    height: 200,
    marginTop: 15,
    borderRadius: 10,
  },
});