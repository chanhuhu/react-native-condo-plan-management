import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BottomSheet,
  Card,
  Image,
  ListItem,
  SearchBar,
} from "react-native-elements";
import { RootStackParamList } from "../App";
import { CameraPreview } from "../components/CameraPreview";
import { FAB } from "../components/FAB";
import ImagesPicker from "../components/ImagesPicker";
import { useBoolean, useSearch, getFilterByFloor } from "../utils";

type Plan = {
  id: string;
  floor: string;
  planURL: string;
  create_at?: Date;
  update_at?: Date;
};

//#region mock data
const plans = [
  {
    id: "1",
    floor: "ground",
    planURL:
      "https://vacationresortsrus.com/wp-content/uploads/2012/10/Smugglers-floorplan-2BR-150x150.png",
  },
];
//#endregion

type HomeNavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function Home({ navigation }: HomeNavigationProps) {
  //#region state
  const { result, search, setSearch } = useSearch<Plan>(
    plans,
    getFilterByFloor
  );
  const [isVisible, { on, off }] = useBoolean(false);
  const [isCameraMode, { on: cameraModeOn, off: cameraModeOff }] = useBoolean(
    false
  );
  const [
    isImagesPicker,
    { on: imagesPickerOn, off: imagesPickerOff },
  ] = useBoolean(false);
  //#endregion

  return (
    <>
      {!isCameraMode && !isImagesPicker && (
        <View style={styles.container}>
          <SearchBar
            placeholder="Search plan"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />

          {result.map((p, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Plan", {
                    planId: p.id,
                    planURL: p.planURL,
                    floor: p.floor,
                  })
                }
              >
                <Card>
                  <View key={i}>
                    <Image
                      style={styles.image}
                      source={{ uri: p.planURL }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text>ชั้น: {p.floor}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
          <FAB name="add-outline" type="ionicon" onPress={() => on()} />
          <BottomSheet
            isVisible={isVisible}
            modalProps={{ animationType: "slide" }}
          >
            <ListItem key={"1"}>
              <ListItem.Content>
                <ListItem.Title onPress={() => cameraModeOn()}>
                  กล้อง
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Title onPress={() => imagesPickerOn()}>
                  ไฟล์
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Title onPress={() => off()}>ปิด</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </BottomSheet>
        </View>
      )}
      {isCameraMode && (
        <View style={styles.cameraContainer}>
          <CameraPreview changeCameraModeOff={() => cameraModeOff()} />
        </View>
      )}
      {isImagesPicker && (
        <View style={styles.cameraContainer}>
          <ImagesPicker></ImagesPicker>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "red",
  },
  cameraContainer: {
    flex: 1,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
  },
});
