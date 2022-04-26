import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { ReactElement, useState } from "react";
import { GradientBackground, AmikoText } from "@components";
import styles from "./Settings.styles";
import { Theme, ThemeOptions } from "@utils";

const themeOptions: ThemeOptions = ["fav", "burple", "spring", "frozen"];

// type difficultyKeyType = "easyList" | "mediumList" | "allList";
// where we use this type below, we can also do the following:
// right now it is difficulties[key as difficultyKeyType]
// instead, could also do difficulties[key as keyof typeof difficulties]
// this would dynamically create the type we have created manually above, directly from
// the difficulties object itself.
// UPDATE: changing it to the dynamic version now.

export default function Settings(): ReactElement {
    // pieces of state
    const [theme, setTheme] = useState<Theme>(
        themeOptions[Math.floor(Math.random() * themeOptions.length)]
    );

    const difficulties = {
        easyList: "Easy Words",
        mediumList: "Medium Words",
        allList: "All Words"
    };

    return (
        <GradientBackground theme={"frozen"}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <AmikoText style={styles.label} weight="600">
                        Game Difficulty
                    </AmikoText>
                    <View style={styles.choiceList}>
                        {Object.keys(difficulties).map((key) => {
                            return (
                                <TouchableOpacity style={styles.choiceButton} key={key}>
                                    <AmikoText style={styles.choiceText}>
                                        {difficulties[key as keyof typeof difficulties]}
                                    </AmikoText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
