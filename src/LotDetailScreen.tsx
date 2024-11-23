// LotDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import API from '../api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LotDetailScreen = ({ route, navigation }) => {
  const { lotId, token } = route.params;
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLotDetails = async () => {
      try {
        const response = await API.getLots(token);
        const foundLot = response.find((item) => item.id === lotId);
        if (foundLot) {
          setLot(foundLot);
        } else {
          Alert.alert('Ошибка', 'Лот не найден');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Ошибка', error.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchLotDetails();
  }, [lotId, token, navigation]);

  const handleRent = async () => {
    try {
      const dates = {
        start_date: '2024-11-20', // Заглушка для демонстрации, можно использовать компонент выбора даты
        end_date: '2024-11-25'
      };
      await API.rentLot(lotId, dates, token);
      Alert.alert('Успех', 'Лот успешно арендован');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{lot.title}</Text>
      <Text style={{ marginVertical: 8 }}>{lot.genre}</Text>
      <Text>Количество игроков: {lot.players}</Text>
      <Text style={{ marginVertical: 8 }}>{lot.description}</Text>
      {lot.status === 'available' ? (
        <Button title="Арендовать" onPress={handleRent} />
      ) : (
        <Text style={{ color: 'red', marginTop: 16 }}>Лот недоступен для аренды</Text>
      )}
    </View>
  );
};

export default LotDetailScreen;
