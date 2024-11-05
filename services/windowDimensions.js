import { Dimensions } from "react-native";

export function MobileWindowDimensions() {
    const windowDimensions = Dimensions.get("window");
    const screenDimensions = Dimensions.get("screen");
    return {
        windowDimensions, screenDimensions
    }
}