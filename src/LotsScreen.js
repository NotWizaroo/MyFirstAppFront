import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";

const LotsScreen = () => {
    const [lots, setLots] = useState([]);

    const getLots = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/lots");
            setLots(response.data); // Обновляем состояние
        } catch (error) {
            console.error("Error fetching lots:", error);
        }
    };

    useEffect(() => {
        getLots(); // Загружаем лоты при загрузке экрана
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Lots</Text>
            <FlatList
                data={lots}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.title}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    item: {
        fontSize: 18,
        marginVertical: 10,
    },
});

export default LotsScreen;
