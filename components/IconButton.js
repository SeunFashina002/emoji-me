import {Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const IconButton = ({ onPress, icon, label }) => (
  <Pressable onPress={onPress} style={styles.iconButton}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        <Text style={styles.iconButtonLabel}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});