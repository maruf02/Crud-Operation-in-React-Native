// import { Button, StyleSheet, Text, View } from "react-native";

// export default function CrudApp() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Crud Without DB</Text>
//       <Button title="Crud Without DB" onPress={() => {}} />
//       <Button title="Crud With Mongo DB" onPress={() => {}} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

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
        {" "}
        {/* Container for buttons */}
        <Button
          title="Crud Without DB"
          onPress={() => setWithoutDBVisible(true)}
        />
        <View style={styles.buttonMargin} />{" "}
        {/* Add some space between buttons */}
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
        {/* Pass a close function */}
      </Modal>

      {/* Modal for CrudWithMongoDB */}
      <Modal
        visible={isWithDBVisible}
        animationType="slide"
        onRequestClose={() => setWithDBVisible(false)}
      >
        <CrudWithMongoDB onClose={() => setWithDBVisible(false)} />
        {/* Pass a close function */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row", // Arrange buttons horizontally
    alignItems: "center", // Center buttons vertically within the container
  },
  buttonMargin: {
    width: 10, // Adjust the width for spacing
  },
});
