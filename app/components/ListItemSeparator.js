import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function ListItemSeparator() {
  return <View style={styles.seperator} />;
}

export default ListItemSeparator;

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
  },
});
