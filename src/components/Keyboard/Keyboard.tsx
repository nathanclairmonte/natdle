import { View } from "react-native";
import React, { ReactElement, useState } from "react";
import KeyboardButton from "./KeyboardButton";
import styles from "./Keyboard.styles";
import { KeyColours } from "@utils";

type KeyboardProps = {
    boardSize: number;
    keyColours: KeyColours;
    submitText: string;
    isSubmitDisabled: boolean;
    gameOver: boolean;
    onKeyPressed: (symbol: string) => void;
};

export default function Keyboard({
    boardSize,
    keyColours,
    submitText,
    isSubmitDisabled,
    gameOver,
    onKeyPressed
}: KeyboardProps): ReactElement {
    // // defining colours as variables for readiblity
    // const black = "#000";
    // const green = "#6baa64";
    // const grey = "#787c7f";
    // const red = "red";

    // defining lengths as variables for readability
    const regWidth = boardSize / 11 + 2;
    const regHeight = boardSize / 6;
    const delWidth = boardSize / 8;
    const submitWidth = boardSize / 2;

    // // used to set key colours based on letters used/available
    // // prettier-ignore
    // const [keyColours, setKeyColours] = useState({
    //     q: black, w: black, e: black, r: black, t: black, y: black, u: black, i: black, o: black, p: black,
    //     a: black, s: black, d: black, f: black, g: black, h: black, j: black, k: black, l: black,
    //     z: black, x: black, c: black, v: black, b: black, n: black, m: black, submit: black, del: red
    // });

    // TODO: add logic to colour keys based on letters coming in

    // prettier-ignore
    return (
        <View style={styles.keyboard}>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="Q" buttonColour={keyColours["Q"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="W" buttonColour={keyColours["W"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="E" buttonColour={keyColours["E"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="R" buttonColour={keyColours["R"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="T" buttonColour={keyColours["T"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="Y" buttonColour={keyColours["Y"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="U" buttonColour={keyColours["U"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="I" buttonColour={keyColours["I"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="O" buttonColour={keyColours["O"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="P" buttonColour={keyColours["P"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="A" buttonColour={keyColours["A"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="S" buttonColour={keyColours["S"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="D" buttonColour={keyColours["D"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="F" buttonColour={keyColours["F"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="G" buttonColour={keyColours["G"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="H" buttonColour={keyColours["H"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="J" buttonColour={keyColours["J"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="K" buttonColour={keyColours["K"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="L" buttonColour={keyColours["L"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="Z" buttonColour={keyColours["Z"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="X" buttonColour={keyColours["X"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="C" buttonColour={keyColours["C"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="V" buttonColour={keyColours["V"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="B" buttonColour={keyColours["B"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="N" buttonColour={keyColours["N"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="M" buttonColour={keyColours["M"]} buttonWidth={regWidth} keyHeight={regHeight} disabled={gameOver}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="DEL" buttonColour={keyColours["DEL"]} buttonWidth={delWidth} keyHeight={regHeight} disabled={gameOver}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol={submitText} buttonColour={keyColours["SUBMIT"]} buttonWidth={submitWidth} keyHeight={regHeight} disabled={isSubmitDisabled || gameOver}/>
            </View>
        </View>
    );
}
