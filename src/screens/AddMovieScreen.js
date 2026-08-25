import { View, Text, StyleSheet } from "react-native";
import { createMovie } from "../api/movies";
import MovieForm from "../components/MovieForm";
import { colors, spacing } from "../theme/colors";

export default function AddMovieScreen({ navigation }) {
  async function handleCreate(movie) {
    await createMovie(movie);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Movie</Text>
      <Text style={styles.subtitle}>Add a new title to your collection.</Text>
      <MovieForm onSubmit={handleCreate} submitLabel="Add Movie" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.burgundyDeep,
    marginBottom: 2,
  },
  subtitle: {
    color: colors.mutedText,
    marginBottom: spacing.md,
  },
});
