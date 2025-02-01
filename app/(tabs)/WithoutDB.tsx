import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types"; // Import PropTypes

// Define type for the props
interface WithoutDBProps {
  onClose: () => void; // onClose is a function that doesn't accept any parameters and doesn't return anything
}

export default function WithoutDB({ onClose }: WithoutDBProps) {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (text.trim() === "") return;

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = text;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, text]);
    }
    setText("");
  };

  const handleEdit = (index: number) => {
    setText(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
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
      <View style={styles.addItem}>
        <Button
          title={editingIndex !== null ? "Update Item" : "Add Item"}
          onPress={handleAddOrUpdate}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => handleEdit(index)}
                style={styles.editButton}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(index)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Close Modal" onPress={onClose} /> {/* Close button */}
    </View>
  );
}

WithoutDB.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// Styles
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
  addItem: {
    marginBottom: 10,
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
  itemText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
