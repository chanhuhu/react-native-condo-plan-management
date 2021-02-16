import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

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
    </View>
  );
}

const styles = StyleSheet.create({});
