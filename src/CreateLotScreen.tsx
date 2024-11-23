// CreateLotScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API from '../api';

const CreateLotScreen = ({ route, navigation }) => {
  const { token } = route.params;
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [players, setPlayers] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateLot = async () => {
    if (!title || !genre || !players || !description) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const newLot = {
        title,
        genre,
        players: parseInt(players, 10),
        description,
      };
      await API.createLot(newLot, token);
      Alert.alert('Успех', 'Лот успешно создан');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создать новый лот</Text>
      <TextInput
        placeholder="Название"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Жанр"
        value={genre}
        onChangeText={setGenre}
        style={styles.input}
      />
      <TextInput
        placeholder="Количество игроков"
        value={players}
        onChangeText={setPlayers}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Описание"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button
        title={loading ? 'Создание...' : 'Создать лот'}
        onPress={handleCreateLot}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    borderBottomWidth: 1,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default CreateLotScreen;
