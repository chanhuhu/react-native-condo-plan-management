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
import { RootNavigatorParamsList } from "../types";
import { CameraPreview, FAB, ImagesPicker } from "../components";
import { getFilterByFloor, useBoolean, useSearch } from "../utils";
import { PlanParams } from "../types";

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
  navigation: StackNavigationProp<RootNavigatorParamsList, "Home">;
};

export default function Home({ navigation }: HomeNavigationProps) {
  //#region state
  const { result, search, setSearch } = useSearch<PlanParams>(
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

  //#region bottom sheet list
  const bottomSheetList = [
    {
      title: "กล้อง",
      onPress: async () => {
        await off();
        await cameraModeOn();
      },
    },
    { title: "ไฟล์", onPress: () => imagesPickerOn() },
    { title: "ปิด", onPress: () => off() },
  ];
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
                    id: p.id,
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
            {bottomSheetList.map((i) => {
              <ListItem key={i.title}>
                <ListItem.Content>
                  <ListItem.Title onPress={i.onPress}>{i.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>;
            })}
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
