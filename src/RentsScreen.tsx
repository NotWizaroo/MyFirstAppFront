// RentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import API from '../api';

const RentsScreen = ({ route }) => {
  const { token } = route.params;
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRents = async () => {
      try {
        setLoading(true);
        const fetchedRents = await API.getRents(token);
        setRents(fetchedRents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, [token]);

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

  if (rents.length === 0) {
    return (
      <View style={styles.center}>
        <Text>У вас нет активных аренд</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rentItem}>
            <Text style={styles.title}>Лот: {item.lotTitle}</Text>
            <Text>Дата начала: {item.startDate}</Text>
            <Text>Дата окончания: {item.endDate}</Text>
            <Text>Статус: {item.status}</Text>
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
  rentItem: {
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
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default RentsScreen;
