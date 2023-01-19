import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
        {checked && <Feather name="check" size={20} color={colors.white} />}
      </View>

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
