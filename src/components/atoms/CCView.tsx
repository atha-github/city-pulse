import React from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { CScale } from "../../utils/CFont";
import CColor from "../../utils/CColor";

export const CCViewMini = ({ children, isBar = false, bgColor = CColor.white, style = {} }:any) => {
    const mainStyle = { ...styles.contentWidgetMini, ...style, backgroundColor: bgColor };
    return (
        <View style={mainStyle}>
            {isBar ? <View style={styles.barStyle} /> : <></>}{children}
        </View>
    );
};


const CCView = ({ children, isForm = false, isBar = false, bgColor = CColor.white, style = {} }:any) => {
    const mainStyle = { ...styles.contentWidget, ...style, backgroundColor: bgColor };
    return (
        <>{isForm ?
            <KeyboardAvoidingView style={mainStyle} behavior={Platform.OS === "ios" ? "padding" : null}>
                {isBar ? <View style={styles.barStyle} /> : <></>}{children}
            </KeyboardAvoidingView> :
            <View style={mainStyle}>
                {isBar ? <View style={styles.barStyle} /> : <></>}{children}
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    contentWidgetMini: {
        backgroundColor: CColor.white,
        width: "100%",
        borderTopLeftRadius: CScale(30),
        borderTopRightRadius: CScale(30),
        alignItems: "center",
        alignSelf: "flex-end",
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOpacity: 1.5,
        paddingHorizontal: CScale(20),
        paddingTop: CScale(20),
        zIndex: 9,
    },
    contentWidget: {
        backgroundColor: CColor.white,
        width: "100%",
        height: "100%",
        flex: 1,
        borderTopLeftRadius: CScale(30),
        borderTopRightRadius: CScale(30),
        alignItems: "center",
        alignSelf: "flex-end",
        shadowColor: "rgba(0,0,0,0.05)",
        shadowOpacity: 1.5,
        paddingHorizontal: CScale(30),
        paddingTop: CScale(20),
        marginTop: CScale(30),
        zIndex: 9,
    },
    rectangle: {
        height: CScale(3),
        width: CScale(77),
        opacity: 0.55,
        backgroundColor: CColor.lightGray,
        alignSelf: "center",
        marginVertical: CScale(8)
    },
    barStyle: {
        alignSelf: "center",
        width: CScale(40),
        height: CScale(3),
        borderRadius: CScale(3),
        backgroundColor: CColor.lightGray,
    },
});

export default CCView;