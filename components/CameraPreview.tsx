import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { useBoolean } from "../utils/useBoolean";
import { Button, Icon } from "react-native-elements";

type Props = {
  changeCameraMode: () => void;
  isCameraMode: boolean;
};

export function CameraPreview({ changeCameraMode, isCameraMode }: Props) {
  //#region state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [picture, setPicture] = useState("");
  // cameraModeOn(on);
  //#endregion

  //#region useEffect
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  //#endregion

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  {
    if (isCameraMode) {
      return (
        <View style={styles.container}>
          <Camera style={styles.camera} type={Camera.Constants.Type.front}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Icon name="camera-reverse-outline" type="ionicon" reverse />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon name="camera-outline" type="ionicon" reverse />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="close-outline"
                  type="ionicon"
                  reverse
                  onPress={() => changeCameraMode()}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
