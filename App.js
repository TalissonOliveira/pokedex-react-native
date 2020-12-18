import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import register from './src/screens/register';
import login from './src/screens/login';
import dashboard from './src/screens/dashboard';
import favorite from './src/screens/favorite';
import settings from './src/screens/settings';

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName={"Login"}>
       <Stack.Screen
        name={'Register'}
        component={register}
        options={{ headerShown: false }}
       />

       <Stack.Screen 
        name={'Login'}
        component={login}
        options={{ headerShown: false }}
       />

      <Stack.Screen
        name={'Dashboard'}
        component={MyTabs}
        options={{ headerShown: false}}
      />

      <Stack.Screen
        name={'settings'}
        component={settings}
        options={{ 
          headerShown: true, 
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#08173B',
          },
          headerTintColor: '#fff'
        }}
      />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      activeColor='#08173B'
      inactiveColor='rgba(215, 215, 215, 1)'
      shifting={true}
      barStyle={{ borderTopWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)'}}
    >
      <Tab.Screen
        name='Dashboard'
        component={dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen 
        name="Favorite" 
        component={favorite} 
        options={{
          tabBarLabel: 'Favorites',
          tabBarColor: '#fff',
          tabBarIcon: ({ color,  focused }) => (
            <MaterialIcons name={ focused ? "favorite" : "favorite-border"} size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}