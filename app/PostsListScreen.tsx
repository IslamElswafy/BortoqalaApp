import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  I18nManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import RouteHeader from "@/constants/RouteHeader";

const PostsListScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "SET_POSTS", payload: data });
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        Alert.alert(
          t("Error"),
          t("Failed to fetch posts. Please try again later."),
          [{ text: t("OK") }]
        );
      });
  }, [dispatch]);

  if (isLoading) {
    return <Text style={styles.messageText}>{t("Loading...")}</Text>;
  }

  if (error) {
    return <Text style={styles.messageText}>{t("Error: ") + error}</Text>;
  }

  return (
    <View style={styles.container}>
      <RouteHeader
        routeName={t("about.routeName")}
        margin={undefined}
        border={undefined}
        onBack={function (): void {}}
        iconColor={""}
        textColor={""}
      />
      {/* LanguageSwitcher Component */}
      <LanguageSwitcher />

      {/* Header Text */}
      <Text style={styles.headerText}>{t("posts")}</Text>

      {/* FlatList to display posts */}
      <FlatList
        data={state.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              router.push({
                pathname: "/PostDetailsScreen",
                params: {
                  post: item.userId,
                  title: item.title,
                  body: item.body,
                },
              })
            }
          >
            {/* Post Title */}
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes up the full screen
    padding: 16, // Adds padding around the content
    backgroundColor: "#f5f5f5", // Background color of the screen
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24, // Font size for the header text
    fontWeight: "bold", // Makes the text bold
    marginBottom: 16, // Adds space below the header text
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  listContentContainer: {
    paddingBottom: 20, // Adds padding at the bottom of the list
  },
  itemContainer: {
    padding: 16, // Adds padding around each item
    backgroundColor: "#ffffff", // Background color for each item
    borderRadius: 8, // Rounds the corners of each item
    marginBottom: 10, // Adds space below each item
    shadowColor: "#000", // Shadow color
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 8, // Shadow radius
    elevation: 3, // Android elevation
  },
  itemText: {
    fontSize: 18, // Font size for the item text
    color: "#333333", // Text color
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});

export default PostsListScreen;
