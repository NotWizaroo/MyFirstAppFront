import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/HomeScreen';
import LotsScreen from './src/LotsScreen';
import LotDetailScreen from './src/LotDetailScreen'; // Импорт LotDetailScreen
import AuthScreen from './src/AuthScreen';
import RegisterScreen from './src/RegisterScreen'; // Импорт RegisterScreen (страница регистрации)
import ProfileScreen from './src/ProfileScreen'; // Импорт ProfileScreen (страница профиля)
import MyLotsScreen from './src/MyLotsScreen'; // Импорт MyLotsScreen (управление лотами)
import RentsScreen from './src/RentsScreen'; // Импорт RentsScreen (аренда лотов)
import CreateLotScreen from './src/CreateLotScreen'; // Импорт CreateLotScreen (создание нового лота)

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lots" component={LotsScreen} />
        <Stack.Screen name="LotDetailScreen" component={LotDetailScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Регистрация' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Профиль' }} />
        <Stack.Screen name="MyLotsScreen" component={MyLotsScreen} options={{ title: 'Мои Лоты' }} />
        <Stack.Screen name="RentsScreen" component={RentsScreen} options={{ title: 'Аренды' }} />
        <Stack.Screen name="CreateLotScreen" component={CreateLotScreen} options={{ title: 'Создать Лот' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;