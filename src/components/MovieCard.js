import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { colors, spacing, radii } from "../theme/colors";
import { genreIcon } from "../theme/genreIcons";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.spring(slide, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const addedDate = new Date(movie.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.genrePill}>
          <Text style={styles.genreText}>
            {genreIcon(movie.genre)} {movie.genre}
          </Text>
        </View>
      </View>

      <Text style={styles.year}>{movie.releaseYear}</Text>
      <Text style={styles.added}>Added {addedDate}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() => onEdit(movie)}
        >
          <Text style={styles.editText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.7}
          onPress={() => onDelete(movie._id)}
        >
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.burgundyDeep,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    borderTopWidth: 3,
    borderTopColor: colors.gold,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm / 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.burgundyDeep,
    flex: 1,
    marginRight: spacing.sm,
  },
  genrePill: {
    backgroundColor: colors.goldLight,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genreText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  year: {
    color: colors.burgundy,
    fontWeight: "800",
    marginBottom: 2,
  },
  added: {
    color: colors.mutedText,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  editBtn: {
    flex: 1,
    backgroundColor: colors.goldLight,
    borderRadius: radii.sm,
    paddingVertical: 10,
    alignItems: "center",
  },
  editText: {
    color: colors.ink,
    fontWeight: "700",
  },
  deleteBtn: {
    flex: 1,
    borderRadius: radii.sm,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.danger,
  },
  deleteText: {
    color: colors.danger,
    fontWeight: "700",
  },
});
