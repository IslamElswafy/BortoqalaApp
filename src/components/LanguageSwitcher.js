import React, { useContext } from "react";
import { Button, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const toggleLanguage = () => {
    const newLanguage = state.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    dispatch({ type: "SET_LANGUAGE", payload: newLanguage });
  };

  return (
    <View>
      <Button
        // Set the button title based on the current language
        title={t(
          state.language === "en" ? "Switch to Arabic" : "Switch to English"
        )}
        onPress={toggleLanguage}
      />
    </View>
  );
};

export default LanguageSwitcher;
