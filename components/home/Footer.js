import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Footer = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(""); // State to track the active icon

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleIconPress("home");
          navigation.push('HomeScreen');
        }}
      >
        <Icon
          name="home"
          size={24}
          color={activeIcon === "home" ? "#fb3768" : "#fff"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleIconPress("search");
          navigation.push('SearchMainApp');
        }}
      >
        <Icon
          name="search"
          size={24}
          color={activeIcon === "search" ? "#fb3768" : "#fff"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleIconPress("apps");
          navigation.push('MainCards');
        }}
      >
        <Icon
          name="cloud"
          size={24}
          color={activeIcon === "cloud" ? "#fb3768" : "#fff"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleIconPress("notifications");
          navigation.push('Notify');
        }}
      >
        <Icon
          name="notifications"
          size={24}
          color={activeIcon === "notifications" ? "#fb3768" : "#fff"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          handleIconPress("person");
          navigation.push('Profile');
        }}
      >
        <Icon
          name="person"
          size={24}
          color={activeIcon === "person" ? "#fb3768" : "#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 17,
    flexDirection: "row",
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 2,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Footer;
