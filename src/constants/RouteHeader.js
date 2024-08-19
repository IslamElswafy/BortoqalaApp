// RouteHeader.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const isRTL = I18nManager.isRTL;
const RouteHeader = ({
  routeName,
  onBack,
  iconColor,
  textColor,
  margin,
  border,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    onBack();
    navigation.goBack();
  };
  const { t } = useTranslation();
  return (
    <View
      style={[
        styles.container,
        {
          marginTop:
            Platform.OS === "ios"
              ? margin
                ? margin
                : 0
              : margin
              ? margin
              : 25,
          borderBottomColor: border ? border : "#fff",
        },
      ]}
    >
      <TouchableOpacity onPress={handleBack}>
        <AntDesign
          name={isRTL ? "right" : "left"}
          size={24}
          color={iconColor}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBack}>
        <Text style={[styles.title, { color: textColor }]}>{t(routeName)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginLeft: 16,
  },
});

export default RouteHeader;
