import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useGetEventsQuery, useLazyGetEventsByPageQuery } from '../../core/rtk/api'
import ListShow from '../../core/components/ListView'
import EventCard from '../../core/components/EventCard'
import SearchIcon from '../../core/assets/icons/search'
import { Event } from './type'
import { debounce } from '../../core/utils/time'
import { colors } from '@src/core/constants/color'

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const renderItem = useCallback(({item}:{item:Event}) => <EventCard event={item}/>, []);
  
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search with city name..."
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          onChangeText={debounce((text)=>setSearchQuery(text), 500)}
        />
        <TouchableOpacity>
          <SearchIcon size={20} color="#888" />
        </TouchableOpacity>
      </View>
      <ListShow
        query1={useGetEventsQuery}
        query2={useLazyGetEventsByPageQuery}
        renderItem={renderItem}
        queryParams={{city: searchQuery}}
        initialNumToRender={10}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 15, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5
  },

  input: {
    flex: 1, 
    fontSize: 16,
    color: colors.black
  },
  btn:{
    padding: 10
  }
})