import { Platform } from "react-native";

import colors from "../config/colors";

export default {
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: colors.darkGrey,
  },
};
