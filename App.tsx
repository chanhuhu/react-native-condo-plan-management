import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import Plan from "./screens/Plan";

export type RootStackParamList = {
  Home: undefined;
  Plan: { planId: string; planURL: string; floor: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Plan" component={Plan} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
