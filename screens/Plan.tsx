import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import { RootNavigatorParamsList } from "../types";

type Props = {
  navigation: StackNavigationProp<RootNavigatorParamsList, "Plan">;
  route: RouteProp<RootNavigatorParamsList, "Plan">;
};

export default function Plan({ navigation, route }: Props) {
  const { id, planURL, floor } = route.params;
  return (
    <View>
      <Text>{`planId: ${id}`}</Text>
      <Text>{`planURL: ${planURL}`}</Text>
      <Text>{`floor: ${floor}`}</Text>
      <Button onPress={() => navigation.goBack()} title="กลับ" />
      <Image
        source={{ uri: planURL }}
        style={{ width: 200, height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({});
