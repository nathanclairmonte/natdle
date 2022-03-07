import { Text, SafeAreaView } from "react-native";
import React, { ReactElement } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board, Keyboard } from "@components";

export default function SinglePlayerGame(): ReactElement {
    const boardSize = 340;

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
                    size={boardSize}
                />
                <Keyboard
                    onKeyPressed={(symbol) => {
                        console.log(symbol);
                    }}
                    boardSize={boardSize}
                />
            </SafeAreaView>
        </GradientBackground>
    );
}
