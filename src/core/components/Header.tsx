import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ArrowLeftIcon from '../assets/icons/arrow-left'
import { colors } from '../constants/color';
import { router } from '../utils/router';


interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> router.back()}>
        <ArrowLeftIcon size={25}/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: colors.black
  }
})
