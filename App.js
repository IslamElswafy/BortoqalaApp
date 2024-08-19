import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsListScreen from "./src/screens/PostsListScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import { AppProvider } from "./src/context/AppContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n";
const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="PostsList"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="PostsList"
              component={PostsListScreen}
              options={{ title: "Posts" }}
            />
            <Stack.Screen
              name="PostDetails"
              component={PostDetailsScreen}
              options={{ title: "Post Details" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </I18nextProvider>
  );
}
