import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = React.ComponentProps<typeof Icon> & {
  children?: React.ReactNode;
};

export function FAB({ children, ...props }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Icon style={styles.fab} reverse {...props} />
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 25,
    bottom: 25,
  },
});
