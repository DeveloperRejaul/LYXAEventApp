import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../core/hooks/redux'
import EventCard from '../../core/components/EventCard';


export default function FavoriteScreen() {
  const favoriteEvents = useAppSelector((state) => state.favorite);
  return (
    <View style={styles.container}>
      <FlatList 
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        renderItem={({item}) => <EventCard event={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No favorite data found</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 15,
  },
  empty:{
    paddingTop: 20,
    textAlign:'center',
  },
})