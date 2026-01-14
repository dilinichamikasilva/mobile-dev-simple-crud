import "../global.css";
import { View } from "react-native";
import React from "react";
import { CameraView } from "expo-camera";

const index = () => {
  return (
    <View className="flex-1 bg-black">
      <CameraView className="flex-1" />
    </View>
  );
};

export default index;
