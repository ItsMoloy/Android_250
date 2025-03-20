// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import LoginPage from './screens/LoginPage';
// import HomePage from './screens/HomePage';
// import AppointmentPage from './screens/AppointmentPage';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Home" component={HomePage} />
//         <Stack.Screen name="Appointment" component={AppointmentPage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper'; // Paper UI জন্য
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import AppointmentPage from './screens/AppointmentPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }} // Header hide for Login
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ title: 'Dashboard' }}
          />
          <Stack.Screen
            name="Appointment"
            component={AppointmentPage}
            options={{ title: 'Book Appointment' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
