import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/home';
import { colors } from '../constants/color';
import FavoriteIcon from '../assets/icons/favorite';

export default function TabBar({ state, navigation }: BottomTabBarProps) {

  const icon = {
    Home: HomeIcon,
    Favorite: FavoriteIcon,
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = icon[route.name as keyof typeof icon];
        

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Icon 
              color={isFocused ? colors.primary : colors.black} 
              size={25}
            />
            <Text style={{ color: isFocused ? colors.primary : colors.black, fontSize: 12 }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});