import React from 'react';
import { SafeAreaView, useColorScheme, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen'; // Ваш главный экран
import LotsScreen from './src/LotsScreen'; // Экран для списка лотов
import { Colors } from 'react-native/Libraries/NewAppScreen'; // Для обработки темной и светлой темы

const Stack = createStackNavigator();

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }} // Название в заголовке
          />
          <Stack.Screen
            name="Lots"
            component={LotsScreen}
            options={{ title: 'Available Lots' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
