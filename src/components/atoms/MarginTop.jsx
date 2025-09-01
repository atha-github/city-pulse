import React from "react";
import { View } from "react-native";
import { CScale } from "../../utils/CFont";
import CColor from "../../utils/CColor";

const MarginTop = React.memo(({ Line, Top = 0, ...otherProps }:any) => (
  <View style={[{ height: Line ? 0.5 : 0, backgroundColor: CColor.white, width: "100%", marginTop: CScale(Top), opacity: 0.3 }, otherProps.style]} />
));

export default MarginTop;