import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Feed from "./screens/Feed";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: "latest" | "top" } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen
            name="Profile"
            component={Profile}
            initialParams={{ userId: "dog" }}
          />
          <RootStack.Screen name="Feed" component={Feed} />
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
