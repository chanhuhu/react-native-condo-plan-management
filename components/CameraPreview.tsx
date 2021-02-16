import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";

export function CameraPreview() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (picture) {
    return <Image style={styles.plan} source={{ uri: picture }} />;
  } else if (isCameraMode) {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => {
            // @ts-ignore
            this.camera = ref;
          }}
          type={Camera.Constants.Type.front}
          style={styles.camera}
        ></Camera>
      </View>
    );
  } else {
    return <Button onPress={() => setIsCameraMode(true)} title="Take Photo" />;
  }
}

const styles = StyleSheet.create({
  plan: { width: "100%", height: 360, marginBottom: 20 },
  cameraContainer: { width: "100%", height: 400, marginBottom: 20 },
  camera: { width: "100%", height: 360 },
});
