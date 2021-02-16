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
    planURL: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
  },
  {
    id: "2",
    floor: "second floor",
    planURL: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
  },
  {
    id: "3",
    floor: "thrid floor",
    planURL: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
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
  const list = [
    { title: "อัพโหลด" },
    { title: "กล้อง" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => off(),
    },
  ];

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search plan"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <CameraPreview />

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
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
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
