import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, Plan, Project } from "../screens";
import { RootNavigatorParamsList } from "../types";

const RootStack = createStackNavigator<RootNavigatorParamsList>();

export default function RootNavigator() {
  const { Navigator, Screen } = RootStack;
  return (
    <Navigator>
      <Screen name="Project" component={Project}></Screen>
      <Screen name="Home" component={Home}></Screen>
      <Screen name="Plan" component={Plan}></Screen>
    </Navigator>
  );
}
