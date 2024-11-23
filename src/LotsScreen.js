import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import API from "../api"; // Импортируем наш модуль API

const LotsScreen = () => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Токен пользователя (в реальном приложении его нужно получить из контекста или хранилища)
  const token = "ВАШ_ТОКЕН";

  useEffect(() => {
    const fetchLots = async () => {
      try {
        setLoading(true);
        const fetchedLots = await API.getLots(token);
        setLots(fetchedLots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
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
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lotItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default LotsScreen;
