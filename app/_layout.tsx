import runMigrations from "@/src/infra/database/migrations";
import { store } from "@/src/store/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  useEffect(() => {
    async function get() {
      await runMigrations();
    }
    get();
  }, []);
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
