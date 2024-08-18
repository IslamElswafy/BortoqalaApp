import React, { useContext } from "react";
import { Button, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  // Access the translation function and current language using useTranslation
  const { t, i18n } = useTranslation();

  // Access the state and dispatch from the AppContext
  const { state, dispatch } = useContext(AppContext);

  // Function to toggle the language between English and Arabic
  const toggleLanguage = () => {
    const newLanguage = state.language === "en" ? "ar" : "en";

    // Change the language in i18n
    i18n.changeLanguage(newLanguage);

    // Update the language in the global state
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
