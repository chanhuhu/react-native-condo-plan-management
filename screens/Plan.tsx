import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Image } from "react-native-elements";

type PlanRouteProp = RouteProp<RootStackParamList, "Plan">;

type Props = {
  route: PlanRouteProp;
};

export default function Plan({ route }: Props) {
  const { planId, planURL, floor } = route.params;
  return (
    <View>
      <Text>{`planId: ${planId}`}</Text>
      <Text>{`planURL: ${planURL}`}</Text>
      <Text>{`floor: ${floor}`}</Text>
      <Image
        source={{ uri: planURL }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({});
