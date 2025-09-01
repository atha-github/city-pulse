import React from "react";
import { View, StyleSheet } from "react-native";
import CFont from "../../utils/CFont";
import CColor from "../../utils/CColor";


const CDivider = React.memo(({ align = "H", height = CFont.s(1), width = "100%", color = CColor.darkGray, ...otherProps }:any) => {
  if (align === "V") {
    return (<View style={[{ height: height, backgroundColor: color, width: CFont.s(1) }, otherProps.style]} />);
  } else if (align === "DH") {
    return (<View style={[styles.dottedLine, { width: width }, otherProps.style]} />);
  } else {
    return (<View style={[{ height: height, backgroundColor: color, width: width }, otherProps.style]} />);
  }
});

export default CDivider;


const styles = StyleSheet.create({
  dottedLine: {
    borderWidth: CFont.s(1),
    borderColor: CColor.lightGray,
    borderStyle: 'dashed',
    width: '100%',
  },
});
