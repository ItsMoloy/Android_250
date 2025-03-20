import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import AppointmentPage from './screens/AppointmentPage';
import { Asset } from 'expo-asset'
import SignUpPage from './screens/SignUpPage';
import ConfirmationPage from './screeConfirmationPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Appointment" component={AppointmentPage} />
        <Stack.Screen name="Confirmation" component={ConfirmationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
