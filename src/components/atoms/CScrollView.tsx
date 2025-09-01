import React from "react";
import { ScrollView, StyleSheet, View, ScrollViewProps } from "react-native";
import { CScale } from "../../utils/CFont";

export type CScrollViewProps = ScrollViewProps & {
  contentStyle?: object;
};

const CScrollView = React.forwardRef<ScrollView, CScrollViewProps>(
  ({ children, style, contentStyle, ...otherProps }, ref) => (
    <ScrollView
      ref={ref}
      style={StyleSheet.flatten([styles.container, style])}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
      <View style={StyleSheet.flatten([styles.content, contentStyle])}>{children}</View>
    </ScrollView>
  )
);

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    flex: 1,
    width: "100%",
  },
  content: {
    marginBottom: CScale(20),
    marginHorizontal: 0,
    width: "100%",
  },
});

export default CScrollView;