import { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";
import { colors, spacing, radii } from "../theme/colors";

export default function MovieForm({ initialData, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [releaseYear, setReleaseYear] = useState(
    initialData?.releaseYear ? String(initialData.releaseYear) : "",
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 0.96,
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
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
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
        placeholderTextColor={colors.mutedText}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Animation"
        placeholderTextColor={colors.mutedText}
        value={genre}
        onChangeText={setGenre}
      />

      <Text style={styles.label}>Release Year</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2001"
        placeholderTextColor={colors.mutedText}
        keyboardType="number-pad"
        value={releaseYear}
        onChangeText={setReleaseYear}
      />

      <Pressable
        onPress={handleSubmit}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={submitting}
      >
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          {submitting ? (
            <ActivityIndicator color={colors.cream} />
          ) : (
            <Text style={styles.buttonText}>{submitLabel} 🎬</Text>
          )}
        </Animated.View>
      </Pressable>
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
    color: colors.burgundy,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.cream,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: "#e6d9c3",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.ink,
  },
  button: {
    backgroundColor: colors.burgundy,
    borderRadius: radii.sm,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gold,
    shadowColor: colors.burgundyDeep,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: colors.goldLight,
    fontWeight: "700",
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },
});
