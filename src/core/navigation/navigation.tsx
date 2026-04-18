

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../features/home/home-screen';
import FavoriteScreen from '../../features/favorite/favorite-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../../features/home/details-screen';
import TabBar from '../components/TabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator 
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{headerShown: false}}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen} 
      />
    </Tab.Navigator>
  );
}

export default function RootStack() {
  const {top} = useSafeAreaInsets()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle:{
          paddingTop: top + 10
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ 
          headerShown: false ,
        }}
      />
      <Stack.Screen name="details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}