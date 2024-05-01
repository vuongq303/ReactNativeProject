import { Provider } from "react-redux";
import store from "./src/redux/store";
import NavigationScreen from "./src/screens";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationScreen />
      </NativeBaseProvider>
    </Provider>
  );
}
