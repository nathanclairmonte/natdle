import { ScrollView, TouchableOpacity, View, Switch, Alert } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { GradientBackground, AmikoText } from "@components";
import styles from "./Settings.styles";
import { Theme, ThemeOptions } from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeOptions: ThemeOptions = ["fav", "burple", "spring", "frozen"];

const difficulties = {
    easy: "Easy Words",
    medium: "Medium Words",
    hard: "All Words"
};

type SettingsType = {
    difficulty: keyof typeof difficulties;
    haptics: boolean;
    sounds: boolean;
};

const defaultSettings: SettingsType = {
    difficulty: "hard",
    haptics: true,
    sounds: true
};

// type difficultyKeyType = "easy" | "medium" | "hard";
// where we use this type below, we can also do the following:
// right now it is difficulties[key as difficultyKeyType]
// instead, could also do difficulties[key as keyof typeof difficulties]
// this would dynamically create the type we have created manually above, directly from
// the difficulties object itself.
// UPDATE: changing it to the dynamic version now.

export default function Settings(): ReactElement | null {
    // pieces of state
    // const [theme, setTheme] = useState<Theme>(
    //     themeOptions[Math.floor(Math.random() * themeOptions.length)]
    // );
    const [dummyState, setDummyState] = useState(false);
    const [dummyState2, setDummyState2] = useState(false);
    const [settings, setSettings] = useState<SettingsType | null>(null);

    // function to load settings (either from AsyncStorage or just default)
    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("@settings");
            settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
        } catch (error) {
            setSettings(defaultSettings);
        }
    };

    // function to update and save a setting when it is changed on screen
    const updateSetting = async <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => {
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = { ...oldSettings, [setting]: value };
            await AsyncStorage.setItem("@settings", JSON.stringify(newSettings));
            setSettings(newSettings);
        } catch (error) {
            Alert.alert("Error!", "An error has occurred updating the settings");
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // if the settings are not yet loaded, don't render page yet
    if (!settings) return null;

    // page to be rendered
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
                                <TouchableOpacity
                                    key={key}
                                    style={[
                                        styles.choiceButton,
                                        {
                                            backgroundColor:
                                                settings.difficulty === key ? "#97D9E1" : "white"
                                        }
                                    ]}
                                    onPress={() => {
                                        updateSetting(
                                            "difficulty",
                                            key as keyof typeof difficulties
                                        );
                                    }}
                                >
                                    <AmikoText style={styles.choiceText}>
                                        {difficulties[key as keyof typeof difficulties]}
                                    </AmikoText>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AmikoText style={styles.label} weight="600">
                        Sounds
                    </AmikoText>
                    <Switch
                        trackColor={{
                            true: "#97D9E1"
                        }}
                        value={settings.sounds}
                        onValueChange={() => {
                            updateSetting("sounds", !settings.sounds);
                        }}
                    />
                </View>

                <View style={[styles.field, styles.switchField]}>
                    <AmikoText style={styles.label} weight="600">
                        Haptics/Vibrations
                    </AmikoText>
                    <Switch
                        trackColor={{
                            true: "#97D9E1"
                        }}
                        value={settings.haptics}
                        onValueChange={() => {
                            updateSetting("haptics", !settings.haptics);
                        }}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}
