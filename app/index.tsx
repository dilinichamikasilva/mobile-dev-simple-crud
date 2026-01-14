import "../global.css";
import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import {
  CameraView,
  useCameraPermissions,
  CameraType,
  BarcodeScanningResult,
} from "expo-camera";

const index = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(true); // 👈 NEW

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required!</Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    setIsScanning(false); // 👈 STOP scanning after first scan
    console.log("Scanned data:", result.data);
    alert(`Scanned: ${result.data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={
          isScanning && !scanned ? handleBarcodeScanned : undefined
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Flip Camera"
          onPress={() =>
            setFacing((prev) => (prev === "back" ? "front" : "back"))
          }
        />

        <Button
          title={isScanning ? "Stop Scanning" : "Start Scanning"}
          onPress={() => {
            setScanned(false);
            setIsScanning((prev) => !prev);
          }}
        />

        {scanned && (
          <Button
            title="Scan Again"
            onPress={() => {
              setScanned(false);
              setIsScanning(true);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default index;

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
    gap: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
