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
import LanguageSwitcher from "../components/LanguageSwitcher";
import { AppContext } from "../context/AppContext";

const PostsListScreen = () => {
  // Context and translation hooks
  const { state, dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Local state for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts data from API
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=20") // Limit to 20 posts
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

  // Loading and error states
  if (isLoading) {
    return <Text style={styles.messageText}>{t("Loading...")}</Text>;
  }

  if (error) {
    return <Text style={styles.messageText}>{t("Error: ") + error}</Text>;
  }

  // Render posts list
  return (
    <View style={styles.container}>
      <LanguageSwitcher />

      <Text style={styles.headerText}>{t("posts")}</Text>

      <FlatList
        data={state.posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post: item.userId,
                title: item.title,
                body: item.body,
              })
            }
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    color: "#333333",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});

export default PostsListScreen;
