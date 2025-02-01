import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes

const API_URL = "http://192.168.0.141:5000/api/items";

type Item = { _id: string; name: string };

function WithDB({ onClose }) {
  // Add onClose prop here
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddOrUpdate = async () => {
    if (text.trim() === "") return;

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name: text });
      } else {
        await axios.post(API_URL, { name: text });
      }
      setText("");
      setEditingId(null);
      fetchItems();
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const handleEdit = (id: string, name: string) => {
    setText(name);
    setEditingId(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <View style={stylesWithDB.container}>
      {" "}
      {/* Use styles from WithoutDB */}
      <Text style={stylesWithDB.title}>Simple CRUD App</Text>{" "}
      {/* Use styles from WithoutDB */}
      {/* ... (rest of your WithDB component code) */}
      <Button title="Close Modal" onPress={onClose} /> {/* Close button */}
    </View>
  );
}

WithDB.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonMargin: {
    width: 10,
  },
});
