import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { formatDate } from '../utils/date-time';
import UnFavoriteIcon from '../assets/icons/favorite';
import { Event } from '../../features/home/type';
import { useDispatch } from 'react-redux';
import { toogleFavorite } from '../../features/favorite/favoriteSlice';
import FavoriteSolid from '../assets/icons/favorite-solid';
import { useAppSelector } from '../hooks/redux';
import Animated, { LinearTransition, FadeOut } from 'react-native-reanimated';
import { router } from '../utils/router';

interface Props {
  event: Event;
}

const EventCard = ({
  event,
}: Props) => {
  const dispatch = useDispatch();
  const favoriteEvents = useAppSelector((state) => state.favorite);
  const image = event?.images?.[0]?.url;
  const name = event?.name;
  const date = formatDate(event?.dates?.start?.localDate, event?.dates?.start?.localTime);
  const venue = event?._embedded?.venues?.[0]?.name || 'Unknown Venue';
  const city = event?._embedded?.venues?.[0]?.city?.name || '';
  const category = event?.classifications?.[0]?.segment?.name || 'Other';
  const isFavorite = favoriteEvents.some(e => e.id === event.id);



  
  return (
    <Animated.View
      layout={LinearTransition.springify()}
      exiting={FadeOut}
    >
      <TouchableOpacity 
        style={styles.card} 
        onPress={()=>{
          router.navigate('details', {event})
        }}
      >
      
        {/* Image */}
        <Image
          source={{ uri: image}}
          style={styles.image}
        />

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={()=>{
            dispatch(toogleFavorite(event))
          }}
        >
          {isFavorite ? <FavoriteSolid size={25}/> : <UnFavoriteIcon size={25}/>}
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>

          <Text style={styles.date}>{date}</Text>

          <Text style={styles.venue}>
            {venue}
            {city ? `, ${city}` : ''}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EventCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 180,
  },

  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 4,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  date: {
    fontSize: 13,
    color: '#555',
  },

  venue: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },

  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 12,
    color: '#333',
  },
});