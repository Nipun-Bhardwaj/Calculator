import { Pressable, StyleSheet, Text, View } from "react-native";

function Buttons({ title, style, color, pressHandler }) {
  return (
    <Pressable
      onPress={pressHandler}
      style={[
        styles.container,
        style,
        ({ pressed }) => pressed && styles.press,
      ]}
    >
      <Text style={[styles.textStyle, color]}>{title}</Text>
    </Pressable>
  );
}

export default Buttons;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  press: {
    backgroundColor: "black",
    opacity: 0.75,
    borderRadius: 40,
    color: "white",
    overflow: "hidden",
  },
});
