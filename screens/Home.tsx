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
  Icon,
  Image,
  ListItem,
  SearchBar,
} from "react-native-elements";
import { RootStackParamList } from "../App";
import { CameraPreview } from "../components/CameraPreview";
import { useBoolean } from "../utils/useBoolean";
import { getFilterByFloor, useSearch } from "../utils/useSearch";

type Plan = {
  id: string;
  floor: string;
  planURL: string;
  create_at?: Date;
  update_at?: Date;
};

const plans = [
  {
    id: "1",
    floor: "ground",
    planURL:
      "https://vacationresortsrus.com/wp-content/uploads/2012/10/Smugglers-floorplan-2BR-150x150.png",
  },
  {
    id: "2",
    floor: "second floor",
    planURL:
      "https://vacationresortsrus.com/wp-content/uploads/2012/10/Smugglers-floorplan-2BR-150x150.png",
  },
  {
    id: "3",
    floor: "thrid floor",
    planURL:
      "https://vacationresortsrus.com/wp-content/uploads/2012/10/Smugglers-floorplan-2BR-150x150.png",
  },
];

type HomeNavigationProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function Home({ navigation }: HomeNavigationProps) {
  const { result, search, setSearch } = useSearch<Plan>(
    plans,
    getFilterByFloor
  );
  const [isVisible, { on, off }] = useBoolean(false);

  return (
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
                  source={{ uri: p.planURL }}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <Text>ชั้น: {p.floor}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity activeOpacity={0.7} style={styles.fab}>
        <Icon
          name="add-outline"
          type="ionicon"
          reverse
          style={styles.fab}
          onPress={() => {
            on();
          }}
        />
      </TouchableOpacity>
      <BottomSheet
        isVisible={isVisible}
        modalProps={{ animationType: "slide" }}
      >
        <ListItem>
          <ListItem.Content>
            <CameraPreview title="กล้อง" />
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 25,
    bottom: 25,
  },
});
