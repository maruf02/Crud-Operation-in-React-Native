import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Modal } from "react-native";
import CrudWithoutDB from "./withoutDB";
import CrudWithMongoDB from "./withDB";

export default function CrudApp() {
  const [isWithoutDBVisible, setWithoutDBVisible] = useState(false);
  const [isWithDBVisible, setWithDBVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crud App</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Crud Without DB"
          onPress={() => setWithoutDBVisible(true)}
        />
        <View style={styles.buttonMargin} />{" "}
        <Button
          title="Crud With Mongo DB"
          onPress={() => setWithDBVisible(true)}
        />
      </View>

      {/* Modal for CrudWithoutDB */}
      <Modal
        visible={isWithoutDBVisible}
        animationType="slide"
        onRequestClose={() => setWithoutDBVisible(false)}
      >
        <CrudWithoutDB onClose={() => setWithoutDBVisible(false)} />
      </Modal>

      {/* Modal for CrudWithMongoDB */}
      <Modal
        visible={isWithDBVisible}
        animationType="slide"
        onRequestClose={() => setWithDBVisible(false)}
      >
        <CrudWithMongoDB onClose={() => setWithDBVisible(false)} />
      </Modal>
    </View>
  );
}

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
