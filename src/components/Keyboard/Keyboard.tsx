import { View } from "react-native";
import React, { ReactElement, useState } from "react";
import KeyboardButton from "./KeyboardButton";
import styles from "./Keyboard.styles";
import { KeyColours } from "@utils";

type KeyboardProps = {
    boardSize: number;
    keyColours: KeyColours;
    onKeyPressed: (symbol: string) => void;
};

export default function Keyboard({
    boardSize,
    keyColours,
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
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="q" buttonColour={keyColours["q"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="w" buttonColour={keyColours["w"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="e" buttonColour={keyColours["e"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="r" buttonColour={keyColours["r"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="t" buttonColour={keyColours["t"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="y" buttonColour={keyColours["y"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="u" buttonColour={keyColours["u"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="i" buttonColour={keyColours["i"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="o" buttonColour={keyColours["o"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="p" buttonColour={keyColours["p"]} buttonWidth={regWidth} keyHeight={regHeight}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="a" buttonColour={keyColours["a"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="s" buttonColour={keyColours["s"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="d" buttonColour={keyColours["d"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="f" buttonColour={keyColours["f"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="g" buttonColour={keyColours["g"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="h" buttonColour={keyColours["h"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="j" buttonColour={keyColours["j"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="k" buttonColour={keyColours["k"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="l" buttonColour={keyColours["l"]} buttonWidth={regWidth} keyHeight={regHeight}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="z" buttonColour={keyColours["z"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="x" buttonColour={keyColours["x"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="c" buttonColour={keyColours["c"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="v" buttonColour={keyColours["v"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="b" buttonColour={keyColours["b"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="n" buttonColour={keyColours["n"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="m" buttonColour={keyColours["m"]} buttonWidth={regWidth} keyHeight={regHeight}/>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="del" buttonColour={keyColours["del"]} buttonWidth={delWidth} keyHeight={regHeight}/>
            </View>
            <View style={styles.keyboardRow}>
                <KeyboardButton onKeyPressed={onKeyPressed} symbol="submit" buttonColour={keyColours["submit"]} buttonWidth={submitWidth} keyHeight={regHeight}/>
            </View>
        </View>
    );
}
