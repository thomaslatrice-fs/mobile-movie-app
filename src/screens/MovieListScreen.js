import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getMovies, deleteMovie } from "../api/movies";
import MovieCard from "../components/MovieCard";
import { colors, spacing, radii } from "../theme/colors";

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMovies();
      setMovies(res.data.data);
      setError("");
    } catch (err) {
      setError("Couldn't load your movie collection. Is the API running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch every time this screen comes back into focus (e.g. after adding/editing)
  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [fetchMovies])
  );

  function handleDelete(id) {
    Alert.alert("Remove movie?", "This will remove it from your collection.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMovie(id);
            setMovies((prev) => prev.filter((m) => m._id !== id));
          } catch (err) {
            Alert.alert("Error", "Failed to delete that movie.");
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Collection</Text>
        <Text style={styles.subtitle}>Every film worth remembering, in one place.</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.olive} style={{ marginTop: spacing.lg }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : movies.length === 0 ? (
        <Text style={styles.emptyText}>No movies yet — tap "Add Movie" to start your collection.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onEdit={(movie) => navigation.navigate("EditMovie", { movie })}
              onDelete={handleDelete}
            />
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddMovie")}>
        <Text style={styles.fabText}>+ Add Movie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.olive,
  },
  subtitle: {
    color: colors.oliveSoft,
    marginTop: 2,
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.md,
  },
  emptyText: {
    color: colors.oliveSoft,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.lg,
    textAlign: "center",
    marginTop: spacing.md,
  },
  fab: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  fabText: {
    color: colors.cream,
    fontWeight: "700",
    fontSize: 15,
  },
});
