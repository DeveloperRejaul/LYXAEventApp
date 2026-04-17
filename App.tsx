import React from 'react'
import TabNavigation from './src/core/navigation/navigation'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/core/rtk/store'
import AppProvider from './src/core/provider/app-provider'

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProvider>
    </Provider>
  )
}
