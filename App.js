import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home'
import Notifications from './src/components/Notifications'
import Search from './src/components/Search'
import Download from './src/components/Download'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Heart from 'react-native-vector-icons/AntDesign';
import Dots from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
Heart.loadFont();
Dots.loadFont();
FontAwesome.loadFont();
MaterialIcons.loadFont();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
    >
      <Drawer.Screen 
        name="Settings" component={Home} 
        options={{
            headerShown:false
          }}
      />
      <Drawer.Screen name="Logout" component={Notifications} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#192f6a' }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications-none" color={color} size={size} />
            ),
          }}
          name="Notifications"
          component={Notifications} 
        />
        <Tab.Screen 
         options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" color={color} size={size} />
            ),
          }}
          name="Search"
          component={Search} 
        />
        <Tab.Screen 
         options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="download" color={color} size={size} />
            ),
          }}
          name="Download"
          component={Download} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
