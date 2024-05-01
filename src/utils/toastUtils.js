import { ToastAndroid } from "react-native";
export default function Toast(data) {
  ToastAndroid.showWithGravityAndOffset(
    data,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
}
