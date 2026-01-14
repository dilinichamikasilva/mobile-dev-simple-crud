import "../global.css";
import { View, Text, StyleSheet , Button } from "react-native";
import React, { useState } from "react";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";


const Index = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  // Permission still loading
  if (!permission) {
    return <View />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required!</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />

      <View style={styles.buttonContainer}>
        <Button
          title="Flip Camera"
          onPress={() =>
            setFacing((prev) => (prev === "back" ? "front" : "back"))
          }
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
