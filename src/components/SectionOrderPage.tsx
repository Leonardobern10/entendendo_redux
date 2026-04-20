import { ReactNode } from "react";
import { Text, View } from "react-native";

type SectionOrderPageProps = {
  title: string;
  children: ReactNode;
};

export default function SectionOrderPage({
  title,
  children,
}: SectionOrderPageProps) {
  return (
    <View style={{ minHeight: 150 }}>
      <Text style={{ fontSize: 20, fontWeight: 600 }}>{title}</Text>
      {children}
    </View>
  );
}
