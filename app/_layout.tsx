import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import "react-native-reanimated";
import { AppProvider } from "@/context/AppContext";
import { Stack } from "expo-router";
import "../i18n";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load custom fonts and FontAwesome icons
  const [fontsLoaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Handle errors in font loading
  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
  }, [error]);

  // Callback to hide the splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Display a loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Main layout of the app
  return (
    <AppProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {/* Ensure that the Stack component properly renders the routes */}
        <Stack
          initialRouteName="PostsListScreen"
          screenOptions={{
            headerShown: false, // Example: hide the header, adjust based on your needs
          }}
        />
      </View>
    </AppProvider>
  );
}
