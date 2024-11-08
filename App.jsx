import React from 'react';
import Home from './src/screens/Home';
import List from './src/screens/List';
import Profile from './src/screens/Profile';
import Icon from 'react-native-vector-icons/Feather';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
// import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={'home'} size={25} color="#A43333" />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={'list'} size={25} color="#A43333" />,
        }}
        name="Profiea"
        component={List}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={'user'} size={25} color="#A43333" />,
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="home"
          component={Tabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
