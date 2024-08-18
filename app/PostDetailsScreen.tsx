import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";
import RouteHeader from "@/constants/RouteHeader";

const PostDetailsScreen = () => {
  const route = useRoute();
  const post = route?.params;
  const [user, setUser] = useState(null);

  const { t } = useTranslation();
  const postId = post.post;
  const postTitle = post.title;
  const postBody = post.body;
  useEffect(() => {
    if (post) {
      fetch(`https://jsonplaceholder.typicode.com/users/${postId}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
    }
  }, [post]);

  if (!post) {
    return <Text>{t("No post data available")}</Text>;
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
      {/* Post Title */}
      <Text style={styles.postTitle}>
        {t("title")}: {postTitle}
      </Text>

      {/* Post Body */}
      <Text style={styles.postBody}>
        {t("body")}: {postBody}
      </Text>

      {user && (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsTitle}>{t("userDetails")}</Text>

          {/* User Name */}
          <Text style={styles.userText}>
            {t("name")}: {user?.name}
          </Text>

          {/* User Username */}
          <Text style={styles.userText}>
            {t("username")}: {user?.username}
          </Text>

          {/* User Email */}
          <Text style={styles.userText}>
            {t("email")}: {user?.email}
          </Text>

          {/* User Phone */}
          <Text style={styles.userText}>
            {t("phone")}: {user?.phone}
          </Text>

          {/* User Website */}
          <Text style={styles.userText}>
            {t("website")}: {user?.website}
          </Text>

          {/* User Address */}
          <Text style={styles.userDetailsTitle}>{t("address")}</Text>
          <Text style={styles.userText}>
            {t("street")}: {user?.address?.street}
          </Text>
          <Text style={styles.userText}>
            {t("suite")}: {user?.address?.suite}
          </Text>
          <Text style={styles.userText}>
            {t("city")}: {user?.address?.city}
          </Text>
          <Text style={styles.userText}>
            {t("zipcode")}: {user?.address?.zipcode}
          </Text>

          {/* User Company */}
          <Text style={styles.userDetailsTitle}>{t("company")}</Text>
          <Text style={styles.userText}>
            {t("companyName")}: {user?.company?.name}
          </Text>
          <Text style={styles.userText}>
            {t("catchPhrase")}: {user?.company?.catchPhrase}
          </Text>
          <Text style={styles.userText}>
            {t("bs")}: {user?.company?.bs}
          </Text>
        </View>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: "center",
  },
  postBody: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  userDetailsContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  userText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
});

export default PostDetailsScreen;
