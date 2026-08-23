import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "../screens/MovieListScreen";
import AddMovieScreen from "../screens/AddMovieScreen";
import EditMovieScreen from "../screens/EditMovieScreen";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.olive },
          headerTintColor: colors.cream,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.cream },
        }}
      >
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{ title: "🎬 Reel Notes" }}
        />
        <Stack.Screen name="AddMovie" component={AddMovieScreen} options={{ title: "Add Movie" }} />
        <Stack.Screen name="EditMovie" component={EditMovieScreen} options={{ title: "Edit Movie" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
