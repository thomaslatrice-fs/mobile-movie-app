import { useRef } from "react";
import { Animated, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, radii } from "../theme/colors";

export default function AnimatedFab({ label = "+ Add Movie", onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 30,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.fab, { transform: [{ scale }] }]}>
        <Text style={styles.fabText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.burgundy,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gold,
    shadowColor: colors.burgundyDeep,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fabText: {
    color: colors.goldLight,
    fontWeight: "800",
    fontSize: 15,
  },
});
