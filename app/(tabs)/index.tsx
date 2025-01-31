import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CrudApp() {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Add or Update Item update and add
  const handleAddOrUpdate = (): void => {
    if (text.trim() === "") return;

    if (editingIndex !== null) {
      // Update item
      const updatedItems = [...items];
      updatedItems[editingIndex] = text;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      // Add new item
      setItems([...items, text]);
    }
    setText("");
  };

  // Edit Item
  const handleEdit = (index: number): void => {
    setText(items[index]);
    setEditingIndex(index);
  };

  // Delete Item
  const handleDelete = (index: number): void => {
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

      {/* <Button
        style={styles.addItem}
        title={editingIndex !== null ? "Update Item" : "Add Item"}
        onPress={handleAddOrUpdate}
      /> */}
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
    </View>
  );
}

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
