import { View } from "react-native";
import React, { ReactNode, ReactElement } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

type GradientBackgroundProps = {
    children: ReactNode;
    theme?: "fav" | "burple" | "spring" | "peach" | "frozen";
};

const defaultProps = {
    theme: "fav"
};

export default function GradientBackground({
    children,
    theme
}: GradientBackgroundProps): ReactElement {
    // Note: these gradients were taken from https://cssgradient.io/gradient-backgrounds/

    // noname, just my fav
    let colors = ["#D9AFD9", "#97D9E1"];
    // also noname but was nice
    if (theme === "burple") colors = ["#8EC5FC", "#E0C3FC"];
    // spring warmth
    else if (theme === "spring") colors = ["#fad0c4", "#ffd1ff"];
    // juicy peach
    else if (theme === "peach") colors = ["#ffecd2", "#fcb69f"];
    // frozen dreams
    else if (theme === "frozen") colors = ["#fdcbf1", "#e6dee9"];

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <LinearGradient
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
                colors={colors}
                // colors={["#120318", "#221a36"]} // space galaxy one (from udemy)
                // colors={["#D9AFD9", "#97D9E1"]} // light pink to light blue (fav)
                // colors={["#8EC5FC", "#E0C3FC"]} // blue to like purplish
                // colors={["#fad0c4", "#ffd1ff"]} // spring warmth (light orange to pink)
                // colors={["#ffecd2", "#fcb69f"]} // juicy peach (light yellow to orange)
                // colors={["#fdcbf1", "#e6dee9"]} // frozen dreams (light orange to pink)
            />
            {children}
        </View>
    );
}

GradientBackground.defaultProps = defaultProps;
