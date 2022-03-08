import { SafeAreaView } from "react-native";
import React, { ReactElement, useState } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board, Keyboard } from "@components";
import { Guess, BoardState } from "@utils";

export default function SinglePlayerGame(): ReactElement {
    const boardSize = 340;

    const b: BoardState = ["adieu", "taste", "snake", "erase", "lease", "     "];
    // printFormattedBoard(b);

    const [currWord, setCurrWord] = useState("");
    const [state, setState] = useState([null, null, null, null, null, null] as BoardState);
    const answer = "hoard";

    return (
        <GradientBackground theme="burple">
            <SafeAreaView style={styles.container}>
                <Board
                    // state={["roate", "araar", "wharf", "sharp", "shara", null]}
                    // answer="shara"
                    // state={["adieu", "roads", "board", "hoard", null, null]}
                    // answer="hoard"
                    // state={["adieu", "stair", "tacit", null, null, null]}
                    // answer="tacit"
                    // state={["raise", "canon", "caulk", "batch", "patty", "fatty"]}
                    // answer="fatty"
                    // state={["irate", "spunk", "known", "nuked", "funky", null]}
                    // answer="funky"
                    // state={["raise", "clone", "cults", "culcs", "cycle", null]}
                    // answer="cycle"
                    // state={["raise", "elope", "cheek", "beech", null, null]}
                    // answer="beech"
                    // state={["adieu", "taste", "snake", "erase", "lease", null]}
                    // answer="lease"
                    state={state}
                    answer={answer}
                    size={boardSize}
                    currWord={currWord}
                />
                <Keyboard
                    onKeyPressed={(symbol) => {
                        if (symbol === "del" && currWord.length !== 0) {
                            // remove last character from currWord
                            setCurrWord(currWord.slice(0, -1));
                        } else if (currWord.length === 5) {
                            if (symbol == "submit") {
                                // check if guessed word is acceptable
                                // add guessed word to the state
                                const newState = state.map((guess, idx) => {
                                    return idx == state.indexOf(null) ? (currWord as Guess) : guess;
                                });
                                setState(newState as BoardState);
                                setCurrWord("");
                            } else {
                                // word maxed out, do nothing
                                return;
                            }
                        } else if (symbol !== "del" && symbol !== "submit") {
                            // add character to currWord
                            setCurrWord(currWord + symbol);
                        }
                    }}
                    boardSize={boardSize}
                />
            </SafeAreaView>
        </GradientBackground>
    );
}
