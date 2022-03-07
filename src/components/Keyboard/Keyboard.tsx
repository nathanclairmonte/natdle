import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import KeyboardButton from "./KeyboardButton";
import styles from "./Keyboard.styles";

type KeyboardProps = {
    boardSize: number;
    onKeyPressed: (symbol: string) => void;
};

export default function Keyboard({ boardSize, onKeyPressed }: KeyboardProps): ReactElement {
    return (
        <View style={styles.keyboard}>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="q" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="w" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="e" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="r" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="t" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="y" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="u" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="i" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="o" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="p" boardSize={boardSize} />
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="a" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="s" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="d" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="f" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="g" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="h" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="j" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="k" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="l" boardSize={boardSize} />
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="z" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="x" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="c" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="v" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="b" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="n" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="m" boardSize={boardSize} />
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="Del" boardSize={boardSize} />
            </View>
        </View>
    );
}
