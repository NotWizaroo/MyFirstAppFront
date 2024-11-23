// MyLotsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import API from '../api';

const MyLotsScreen = ({ navigation, route }) => {
  const { token } = route.params;
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyLots = async () => {
      try {
        setLoading(true);
        const fetchedLots = await API.getMyLots(token);
        setLots(fetchedLots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLots();
  }, [token]);

  const handleEditLot = (lotId) => {
    navigation.navigate('EditLotScreen', { lotId, token });
  };

  const handleDeleteLot = async (lotId) => {
    try {
      await API.deleteLot(lotId, token);
      Alert.alert('Успех', 'Лот успешно удалён');
      setLots(lots.filter((lot) => lot.id !== lotId));
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Ошибка: {error}</Text>
      </View>
    );
  }

  if (lots.length === 0) {
    return (
      <View style={styles.center}>
        <Text>У вас нет активных лотов</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.lotItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Жанр: {item.genre}</Text>
            <Text>Игроков: {item.players}</Text>
            <Text>Описание: {item.description}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Редактировать" onPress={() => handleEditLot(item.id)} />
              <Button title="Удалить" onPress={() => handleDeleteLot(item.id)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default MyLotsScreen;
