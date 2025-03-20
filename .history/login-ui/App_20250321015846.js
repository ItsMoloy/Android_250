import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import DoctorDashboard from './screens/DoctorDashboard';
import AdminDashboard from './screens/AdminDashboard';
import AppointmentPage from './screens/AppointmentPage';
import { Asset } from 'expo-asset'
import SignUpPage from './screens/SignUpPage';
import ConfirmationPage from './screens/ConfirmationPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
