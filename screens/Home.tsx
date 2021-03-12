import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Image, SearchBar } from "react-native-elements";
import { CameraPreview, FAB } from "../components";
import { PlanParams, RootNavigatorParamsList } from "../types";
import { getFilterByFloor, useBoolean, useSearch } from "../utils";

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
  const [isCameraMode, { on: cameraModeOn, off: cameraModeOff }] = useBoolean(
    false
  );
  //#endregion

  return (
    <>
      {!isCameraMode && (
        <View style={styles.container}>
          <SearchBar
            lightTheme={true}
            placeholder="Search plan"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />

          {result.map((p, i) => {
            return (
              <TouchableOpacity
                key={i}
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
                  <Image
                    style={styles.image}
                    source={{ uri: p.planURL }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                  <Text>ชั้น: {p.floor}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
          <View style={styles.fab}>
            <FAB
              name="add-outline"
              type="ionicon"
              onPress={() => cameraModeOn()}
            />
          </View>
        </View>
      )}
      {isCameraMode && (
        <View style={styles.cameraContainer}>
          <CameraPreview changeCameraModeOff={() => cameraModeOff()} />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
