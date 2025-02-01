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

const API_URL = "http://localhost:5000/api/items";

type Item = { _id: string; name: string };

//  props type
interface WithDBProps {
  onClose: () => void;
}

export default function WithDB({ onClose }: WithDBProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");
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
    <View style={styles.container}>
      <Text style={styles.title}>Simple CRUD App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item..."
        value={text}
        onChangeText={setText}
      />
      <Button
        title={editingId ? "Update Item" : "Add Item"}
        onPress={handleAddOrUpdate}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleEdit(item._id, item.name)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Close Modal" onPress={onClose} />
    </View>
  );
}

WithDB.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "blue",
  },
});
