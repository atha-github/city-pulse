import { Dimensions, PixelRatio, Platform } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const Size = Platform.OS === "ios" ? 375 : 375;
const scale = SCREEN_WIDTH / Size;
const fontcache: any = {};

export function CScale(size: number) {
    if (size in fontcache) {
        return fontcache[size];
    }
    const newSize = size * scale;
    fontcache[size] = Math.round(PixelRatio.roundToNearestPixel(newSize));
    return fontcache[size];
}

export default {
    RR: "Roboto-Regular",
    RM: "Roboto-Medium",
    RSB: "Roboto-SemiBold",
    RB: "Roboto-Bold",
    s: CScale,
    w: SCREEN_WIDTH,
    h: SCREEN_HEIGHT
};