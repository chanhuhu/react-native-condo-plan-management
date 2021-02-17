import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { Button, ListItem } from "react-native-elements";
import { useBoolean } from "../utils/useBoolean";

type Props = {
  isCameraMode?: boolean;
  title: string;
};

export function CameraPreview({ isCameraMode = false, title }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [picture, setPicture] = useState("");
  const [cameraMode, { on, off }] = useBoolean(isCameraMode);

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
  } else if (cameraMode) {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => {
            // @ts-ignore
            this.camera = ref;
          }}
          type={Camera.Constants.Type.front}
          style={styles.camera}
        >
          <Button title="Close" onPress={() => off()} />
        </Camera>
      </View>
    );
  } else {
    return <ListItem.Title onPress={() => on()}>{title}</ListItem.Title>;
  }
}

const styles = StyleSheet.create({
  plan: { width: "100%", height: 360, marginBottom: 20 },
  cameraContainer: { width: "100%", height: 400, marginBottom: 20 },
  camera: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
