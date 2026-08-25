import { View, Text, StyleSheet } from "react-native";
import { updateMovie } from "../api/movies";
import MovieForm from "../components/MovieForm";
import { colors, spacing } from "../theme/colors";

export default function EditMovieScreen({ route, navigation }) {
  const { movie } = route.params;

  async function handleUpdate(updatedMovie) {
    await updateMovie(movie._id, updatedMovie);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Movie</Text>
      <Text style={styles.subtitle}>Update the details for this title.</Text>
      <MovieForm
        initialData={movie}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
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
