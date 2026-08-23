import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, radii } from "../theme/colors";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const addedDate = new Date(movie.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.genrePill}>
          <Text style={styles.genreText}>{movie.genre}</Text>
        </View>
      </View>

      <Text style={styles.year}>{movie.releaseYear}</Text>
      <Text style={styles.added}>Added {addedDate}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(movie)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(movie._id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.olive,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
    color: colors.olive,
    flex: 1,
    marginRight: spacing.sm,
  },
  genrePill: {
    backgroundColor: colors.sage,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  genreText: {
    color: colors.olive,
    fontSize: 12,
    fontWeight: "600",
  },
  year: {
    color: colors.terracotta,
    fontWeight: "700",
    marginBottom: 2,
  },
  added: {
    color: "#8a8f7d",
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  editBtn: {
    flex: 1,
    backgroundColor: colors.sage,
    borderRadius: radii.sm,
    paddingVertical: 10,
    alignItems: "center",
  },
  editText: {
    color: colors.olive,
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
