import { Text, SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board } from "@components";

export default function SinglePlayerGame(): ReactElement {
    return (
        <GradientBackground theme="burple">
            <SafeAreaView style={styles.container}>
                <Board
                    state={["roate", "grail", "wharf", "sharp", "shard", "     "]}
                    answer="shard"
                    size={370}
                />
            </SafeAreaView>
        </GradientBackground>
    );
}
