import "../global.css";
import { View  , Text} from "react-native";
import React from "react";
import { CameraView , useCameraPermissions } from "expo-camera";

const index = () => {
    const [permission, requestPermission] = useCameraPermissions();

    if(!permission?.granted){
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Camera permission is required!</Text>
                <Text onPress={requestPermission}>Grant permission</Text>
            </View>
        )
    }
    
    return (
        <View className="flex-1 bg-black">
        <CameraView style={{ flex: 1 }} facing="front" />   // Use "front" or "back" to select the camera
        </View>
    );
};

export default index;
