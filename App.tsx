import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/HomeScreen';
import LotsScreen from './src/LotsScreen';
import LotDetailScreen from './src/LotDetailScreen'; // Импорт LotDetailScreen
import AuthScreen from './src/AuthScreen'; 


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lots" component={LotsScreen} />
        <Stack.Screen name="LotDetailScreen" component={LotDetailScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
