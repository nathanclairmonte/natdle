import { Text, SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board } from "@components";

export default function SinglePlayerGame(): ReactElement {
    return (
        <GradientBackground theme="burple">
            <SafeAreaView style={styles.container}>
                <Board
                    // state={["roate", "araar", "wharf", "sharp", "shara", "     "]}
                    // answer="shara"
                    // state={["adieu", "roads", "board", "hoard", "     ", "     "]}
                    // answer="hoard"
                    // state={["adieu", "stair", "tacit", "     ", "     ", "     "]}
                    // answer="tacit"
                    // state={["raise", "canon", "caulk", "batch", "patty", "fatty"]}
                    // answer="fatty"
                    // state={["irate", "spunk", "known", "nuked", "funky", "     "]}
                    // answer="funky"
                    // state={["raise", "clone", "cults", "culcs", "cycle", "     "]}
                    // answer="cycle"
                    // state={["raise", "elope", "cheek", "beech", "     ", "     "]}
                    // answer="beech"
                    state={["adieu", "taste", "snake", "erase", "lease", "     "]}
                    answer="lease"
                    size={370}
                />
            </SafeAreaView>
        </GradientBackground>
    );
}
