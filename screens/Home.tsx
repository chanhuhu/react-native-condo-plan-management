import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
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
import { useBoolean } from "../utils/useBoolean";
import { getFilterByFloor, useSearch } from "../utils/useSearch";

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
  //#endregion
  return (
    <>
      <ScrollView style={styles.container}>
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
              <CameraPreview title="กล้อง" onPress={() => off()} />
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Title onPress={() => console.log("ไฟล์")}>
                ไฟล์
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Title onPress={() => off()}>ปิด</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </BottomSheet>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: "relative",
  },

  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
  },
});
