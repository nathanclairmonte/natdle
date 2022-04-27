import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, AmikoText } from "@components";
import styles from "./Settings.styles";
import { difficulties, useSettings } from "@contexts/Settings-context";

export default function Settings(): ReactElement | null {
    // get settings from useSettings function we created in Settings-context
    const { settings, updateSetting } = useSettings();

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
