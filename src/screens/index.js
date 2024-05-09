import ChatScreen from "./ChatScreen";
import ListChat from "./ListChat";
import WelcomeScreen from "./WelcomeScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import VerifyScreen from "./VerifyPassword";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";
import MainScreen from "./MainScreen";
import SearchProduct from "./SearchProduct";
import FavoriteProduct from "./FavoriteProduct";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import UserScreen from "./UserScreen";
import SettingScreen from "./SettingScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen
          name="welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f2f2f2" },
          }}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainScreen}
        />
        <Stack.Screen
          name="user"
          options={{
            headerStyle: {
              backgroundColor: "#f2f2f2",
            },
            headerShadowVisible: false,
          }}
          component={SettingScreen}
        />
        <Stack.Screen
          name="profile"
          options={{ headerTitle: "User" }}
          component={UserScreen}
        />
        <Stack.Screen
          name="ListProducts"
          options={{ headerShown: false }}
          component={SearchProduct}
        />
        <Stack.Screen
          name="ProductScreen"
          options={{
            headerShown: false,
          }}
          component={ProductScreen}
        />
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={CartScreen}
        />
        <Stack.Screen
          name="favorite"
          options={{ headerTitle: "Favorite" }}
          component={FavoriteProduct}
        />
        <Stack.Screen
          name="allChat"
          options={{
            headerTitle: "My message",
          }}
          component={ListChat}
        />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen
          name="forgotPassword"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f2f2f2" },
          }}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="resetPassword"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f2f2f2" },
          }}
          component={ResetPassword}
        />
        <Stack.Screen
          name="verifyPassword"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f2f2f2" },
          }}
          component={VerifyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
