import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import RouteHeader from "@/constants/RouteHeader";

const PostsListScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_POSTS", payload: data }));
  }, [dispatch]);

  return (
    <View style={styles.container}>
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
    marginTop: 50,
  },
  headerText: {
    fontSize: 24, // Font size for the header text
    fontWeight: "bold", // Makes the text bold
    marginBottom: 16, // Adds space below the header text
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
  },
});

export default PostsListScreen;
