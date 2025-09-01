import React from "react";
import { View } from "react-native";
import CFont, {CScale} from "../../utils/CFont";
import CColor from "../../utils/CColor";

const CView = ({ W100, P10, P10H, P20, P20H, P24, P24H, P30, P30H, FR, FC, JC, JF, JE, JSE, JS, AC, AE, AS, ABSB, ABST, children, style = {}, ...otherProps }:any) => {
    let justifyContent = "flex-start";
    let alignItems = "flex-start";
    let padding = 0;
    let paddingHorizontal = 0;
    let flexDirection = "column";
    let position = "relative";
    let bottom = 1;
    let top = 1;
    let extraStyle = {};
    if (W100) {
        extraStyle = { width: "100%" }
    }
    if (ABSB) {
        position = "absolute";
        bottom = 0;
    }
    if (ABST) {
        position = "absolute";
        top = 0;
    }
    if (JC) {
        justifyContent = "center";
    }
    if (JF) {
        justifyContent = "flex-start";
    }
    if (JE) {
        justifyContent = "flex-end";
    }
    if (JS) {
        justifyContent = "space-between";
    }
    if (JSE) {
        justifyContent = "space-evenly";
    }
    if (AC) {
        alignItems = "center";
    }
    if (AE) {
        alignItems = "flex-end";
    }
    if (AS) {
        alignItems = "flex-start";
    }
    if (P10) {
        padding = CScale(10);
        paddingHorizontal = CScale(10);
    }
    if (P10H) {
        padding = 0;
        paddingHorizontal = CScale(10);
    }
    if (P20) {
        padding = CScale(20);
        paddingHorizontal = CScale(20);
    }
    if (P20H) {
        padding = 0;
        paddingHorizontal = CScale(20);
    }
    if (P24) {
        padding = CScale(24);
        paddingHorizontal = CScale(24);
    }
    if (P24H) {
        padding = 0;
        paddingHorizontal = CScale(24);
    }
    if (P30) {
        padding = CScale(30);
        paddingHorizontal = CScale(30);
    }
    if (P30H) {
        padding = 0;
        paddingHorizontal = CScale(30);
    }
    if (FR) {
        flexDirection = "row";
    }
    if (FC) {
        flexDirection = "column";
    }


    return (
        <View style={{ padding, paddingHorizontal, justifyContent, alignItems, flexDirection, position, ...extraStyle, ...style }} {...otherProps}>
            {children}
        </View>
    )
};

export default CView;