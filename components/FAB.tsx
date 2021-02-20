import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

type Props = React.ComponentProps<typeof Icon> & {
  children?: React.ReactNode;
};

export default function FAB({ children, ...props }: Props) {
  return <Icon style={styles.fab} reverse {...props} />;
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
