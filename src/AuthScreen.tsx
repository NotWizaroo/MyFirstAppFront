// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import API from '../api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Введите email и пароль');
      return;
    }

    setLoading(true);
    try {
      const response = await API.login(email, password);
      Alert.alert('Успех', 'Вы успешно вошли в систему');
      navigation.navigate('Home', { token: response.access_token });
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
<<<<<<< HEAD
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>Авторизация</Text>
=======
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Авторизация</Text>
>>>>>>> bugfix/auth
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 16 }}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 16, borderBottomWidth: 1, padding: 16 }}
      />
      <Button title={loading ? 'Вход...' : 'Войти'} onPress={handleLogin} disabled={loading} />
    </View>
  );
};
<<<<<<< HEAD

export default AuthScreen;

=======
export default AuthScreen;
>>>>>>> bugfix/auth
