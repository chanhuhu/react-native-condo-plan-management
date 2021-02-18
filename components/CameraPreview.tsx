import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { Button, ListItem } from "react-native-elements";
import { useBoolean } from "../utils/useBoolean";

type Props = {
  isCameraMode?: boolean;
  title: string;
  onPress: () => void;
};

export function CameraPreview({ isCameraMode = false, title, onPress }: Props) {
  //#region state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [picture, setPicture] = useState("");
  const [cameraMode, { on, off }] = useBoolean(isCameraMode);
  //#endregion

  //#region useEffect
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  //#endregion

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (picture) {
    return <Image style={styles.plan} source={{ uri: picture }} />;
  } else if (cameraMode) {
    return (
      <>
        <Camera
          ref={(ref) => {
            // @ts-ignore
            this.camera = ref;
          }}
          type={Camera.Constants.Type.front}
          style={styles.camera}
        >
          <View style={styles.cameraToolsContainer}>
            <Button title="Close" onPress={() => off()} />
            <Button title="Snap" onPress={() => console.log("cheese")} />
          </View>
        </Camera>
      </>
    );
  } else {
    return (
      <ListItem.Title
        onPress={() => {
          onPress;
          on();
        }}
      >
        {title}
      </ListItem.Title>
    );
  }
}

const styles = StyleSheet.create({
  plan: { width: "100%", height: 360, marginBottom: 20 },
  cameraToolsContainer: {
    width: "100%",
    height: 400,
    marginBottom: 20,
    flex: 1,
    alignItems: "flex-end",
  },
  camera: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
