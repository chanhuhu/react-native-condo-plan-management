import React, { useState } from "react";
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
import { useSearch, getFilterByFloor } from "../components/useSearch";

type Plan = {
  id: string;
  floor: string;
  plan_url: string;
};

const plans = [
  {
    id: "1",
    floor: "ground",
    plan_url: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
  },
];

export default function Home() {
  const { result, search, setSearch } = useSearch<Plan>(
    plans,
    getFilterByFloor
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const list = [
    { title: "อัพโหลด" },
    { title: "กล้อง" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search plan"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("hello")}
      >
        <Card>
          {result.map((p, i) => {
            return (
              <View key={i}>
                <Image
                  source={{ uri: p.plan_url }}
                  PlaceholderContent={<ActivityIndicator />}
                />
                <Text>ชั้น: {p.floor}</Text>
              </View>
            );
          })}
        </Card>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.fab}>
        <Icon
          name="add-outline"
          type="ionicon"
          reverse
          style={styles.fab}
          onPress={() => {
            setIsVisible(true);
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
