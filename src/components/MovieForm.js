import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { colors, spacing, radii } from "../theme/colors";

export default function MovieForm({ initialData, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [releaseYear, setReleaseYear] = useState(
    initialData?.releaseYear ? String(initialData.releaseYear) : ""
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setError("");

    if (!title.trim() || !genre.trim() || !releaseYear.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ title, genre, releaseYear: Number(releaseYear) });
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.form}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Spirited Away"
        placeholderTextColor="#a3a68f"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Animation"
        placeholderTextColor="#a3a68f"
        value={genre}
        onChangeText={setGenre}
      />

      <Text style={styles.label}>Release Year</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2001"
        placeholderTextColor="#a3a68f"
        keyboardType="number-pad"
        value={releaseYear}
        onChangeText={setReleaseYear}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
        {submitting ? (
          <ActivityIndicator color={colors.cream} />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.oliveSoft,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.cream,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: "#d8dcc8",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.olive,
  },
  button: {
    backgroundColor: colors.olive,
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.cream,
    fontWeight: "700",
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },
});
