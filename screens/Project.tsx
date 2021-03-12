import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { FAB } from "../components";
import { RootNavigatorParamsList } from "../types";

type Props = {
  navigation: StackNavigationProp<RootNavigatorParamsList, "Project">;
};

export default function Project({ navigation }: Props) {
  return (
    <View>
      <View>
        <FAB
          name="add-outline"
          type="ionicon"
          onPress={() => navigation.navigate("Home")}
        ></FAB>
      </View>
    </View>
  );
}
