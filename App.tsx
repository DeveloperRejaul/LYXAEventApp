import React from 'react'
import TabNavigation from './src/core/navigation/navigation'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/core/rtk/store'
import AppProvider from './src/core/provider/app-provider'
import { navigationRef } from '@src/core/utils/router'
import { StatusBar } from 'react-native'
import { colors } from '@src/core/constants/color'



export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content"/>
      <AppProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <TabNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProvider>
    </Provider>
  )
}
