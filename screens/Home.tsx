import React from "react";
import { Button, ThemeProvider } from "react-native-elements";

export default function Home() {
  return (
    <ThemeProvider>
      <Button title="อัพโหลดแปลน" />
      <Button title="รายการแปลน" />
    </ThemeProvider>
  );
}
