import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import storage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

function App(props) {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await storage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
