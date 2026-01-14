import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import "../global.css";

const Index = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission || !mediaPermission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need permission to save photos</Text>
        <Button onPress={requestMediaPermission} title="Grant Media Permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
      console.log("Photo URI:", result.uri);

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      await MediaLibrary.createAlbumAsync("MyAppPhotos", asset, false)
        .catch(() => console.log("Album already exists"));
      Alert.alert("Photo saved to gallery!");
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      {/* Photo Preview */}
      {photo && <Image source={{ uri: photo }} style={styles.photoPreview} />}

      {/* Camera */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={(result: BarcodeScanningResult) => {
          console.log("QR Data:", result.data);
        }}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  permissionText: { textAlign: 'center', fontSize: 18, marginBottom: 16 },
  camera: { flex: 1 },
  photoPreview: { position: 'absolute', top: 40, right: 20, width: 120, height: 160, borderRadius: 8, borderWidth: 2, borderColor: 'white', zIndex: 10 },
  buttonContainer: { position: 'absolute', bottom: 40, flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingHorizontal: 32 },
  button: { flex: 1, marginHorizontal: 8, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 12, borderRadius: 8 },
  buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});
