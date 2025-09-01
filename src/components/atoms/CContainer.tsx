import React from "react";
import { StyleSheet, View, Platform, SafeAreaView } from "react-native";
import CFont, { CScale } from "../../utils/CFont";
import CColor from "../../utils/CColor";
import CLoader from "../molecules/CLoader";

const CContainer = ({ children, isLoading = false, isSafeArea = true, style = {}, ...otherProps }:any) => {
    if (isSafeArea) {
        return (
            <SafeAreaView style={{ ...styles.mainContainer, paddingTop: CScale(10), ...style }} {...otherProps}>
                {isLoading && <CLoader visible={isLoading} />}
                <>{children}</>
            </SafeAreaView>
        );
    } else {
        return (
            <View style={{ ...styles.mainContainer, ...style }} {...otherProps}>
                {isLoading && <CLoader visible={isLoading} />}
                <>{children}</>
            </View>
        );
    }
};

export const CFooter = ({ children, isAbsolute, style = {} }: any) => {
    let extStyle = {};
    if (isAbsolute) {
        extStyle = { position: "absolute" };
    }
    return (
        <View style={{ ...styles.footer, ...extStyle, ...style }}>{children}</View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: CColor.skyBlue600,
        flex: 1,
        height: "100%",
        width: "100%",
    },
    footer: {
        bottom: 0,
        height: CScale(100),
        width: "100%",
    },
});

export default CContainer;