import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Image } from "react-native-elements";

type Props = {
  changeCameraModeOff: () => void;
};

export function CameraPreview({ changeCameraModeOff }: Props) {
  //#region state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState("");
  const cameraRef = useRef<Camera>(null);
  //#endregion

  //#region useEffect and method
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current?.takePictureAsync();
      console.log(photo);

      setPicture(photo?.uri || "");
    }
  };
  //#endregion

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  {
    if (!picture) {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.front}
            ref={cameraRef}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="camera-reverse-outline"
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                  type="ionicon"
                  reverse
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="camera-outline"
                  type="ionicon"
                  reverse
                  onPress={async () => await snap()}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="close-outline"
                  type="ionicon"
                  reverse
                  onPress={() => changeCameraModeOff()}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    } else {
      return (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: picture }}></Image>;
        </View>
      );
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
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
