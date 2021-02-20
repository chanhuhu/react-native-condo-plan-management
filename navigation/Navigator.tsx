import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, ImageEditor, Plan } from "../screens";
import { RootNavigatorParamsList } from "../types";

const RootStack = createStackNavigator<RootNavigatorParamsList>();

export default function RootNavigator() {
  const { Navigator, Screen } = RootStack;
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home}></Screen>
      <Screen name="Plan" component={Plan}></Screen>
      <Screen name="ImageEditor" component={ImageEditor}></Screen>
    </Navigator>
  );
}
