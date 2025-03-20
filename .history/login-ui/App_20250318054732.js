import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import AppointmentPage from './screens/AppointmentPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Appointment" component={AppointmentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
