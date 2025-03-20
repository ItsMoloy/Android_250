import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';

// Import your existing screens
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import AppointmentPage from './screens/AppointmentPage';
import SignUpPage from './screens/SignUpPage';
import ConfirmationPage from './screens/ConfirmationPage';

// Import new screens for multi-user system
import DoctorDashboard from './screens/DoctorDashboard';
import AdminDashboard from './screens/AdminDashboard';

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
          name="Home"
          component={HomePage}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentPage}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationPage}
        />

        {/* New screens for doctor and admin */}
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