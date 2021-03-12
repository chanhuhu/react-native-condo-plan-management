import React from "react";
import { Icon } from "react-native-elements";

type Props = React.ComponentProps<typeof Icon> & {
  children?: React.ReactNode;
};

export default function FAB({ children, ...props }: Props) {
  return (
    <>
      <Icon reverse {...props} />
    </>
  );
}
