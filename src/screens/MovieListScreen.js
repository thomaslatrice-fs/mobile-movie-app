import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getMovies, deleteMovie } from "../api/movies";
import MovieCard from "../components/MovieCard";
import AnimatedFab from "../components/AnimatedFab";
import { colors, spacing, radii } from "../theme/colors";

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async ({ silent } = {}) => {
    try {
      if (!silent) setLoading(true);
      const res = await getMovies();
      setMovies(res.data.data);
      setError("");
    } catch (err) {
      setError("Couldn't load your movie collection. Is the API running?");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Refetch every time this screen comes back into focus (e.g. after adding/editing)
  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [fetchMovies]),
  );

  function handleRefresh() {
    setRefreshing(true);
    fetchMovies({ silent: true });
  }

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
        <Text style={styles.subtitle}>
          Every film worth remembering, in one place. 🎬
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          color={colors.burgundy}
          style={{ marginTop: spacing.lg }}
        />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : movies.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🍿</Text>
          <Text style={styles.emptyText}>
            No movies yet — tap "Add Movie" to start your collection!
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.burgundy}
            />
          }
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onEdit={(movie) => navigation.navigate("EditMovie", { movie })}
              onDelete={handleDelete}
            />
          )}
        />
      )}

      <AnimatedFab
        label="🎞️ Add Movie"
        onPress={() => navigation.navigate("AddMovie")}
      />
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
    color: colors.burgundyDeep,
  },
  subtitle: {
    color: colors.mutedText,
    marginTop: 2,
  },
  errorText: {
    color: colors.danger,
    marginTop: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.xl,
    alignItems: "center",
    marginTop: spacing.md,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.burgundy,
    textAlign: "center",
    fontWeight: "600",
  },
});
