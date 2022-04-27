import { SafeAreaView, Dimensions, View, Image } from "react-native";
import React, { ReactElement, useState } from "react";
import styles from "./SinglePlayerGame.styles";
import { GradientBackground, Board, Keyboard, AmikoText, MyButton } from "@components";
import {
    Guess,
    BoardState,
    KeyColours,
    answers,
    answersEasy,
    answersMedium,
    allowedGuesses,
    Theme,
    ThemeOptions,
    useSounds
} from "@utils";
import { useSettings } from "@contexts/Settings-context";

const themeOptions: ThemeOptions = ["fav", "burple", "spring", "frozen"];
const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function SinglePlayerGame(): ReactElement {
    // defining colours as variables for readiblity
    const black = "#000";
    const red = "red";
    const grey = "#787c7f";

    // initialization variables
    // const boardSize = 340;
    const boardSize = SCREEN_WIDTH - 42;
    const startState: BoardState = [null, null, null, null, null, null];
    //prettier-ignore
    const startKeyColours: KeyColours = {
        Q: black, W: black, E: black, R: black, T: black, Y: black, U: black, I: black, O: black, P: black,
        A: black, S: black, D: black, F: black, G: black, H: black, J: black, K: black, L: black,
        Z: black, X: black, C: black, V: black, B: black, N: black, M: black, SUBMIT: black, DEL: red
    }

    // getting settings from the settings context
    const { settings } = useSettings();

    // defining answers list based on difficulty
    let answersList;
    if (settings?.difficulty === "easy") answersList = answersEasy;
    else if (settings?.difficulty == "medium") answersList = answersMedium;
    else answersList = answers;

    // pieces of state
    const [theme, setTheme] = useState<Theme>(
        themeOptions[Math.floor(Math.random() * themeOptions.length)]
    );
    const [state, setState] = useState<BoardState>(startState); // state of the board
    const [answer, setAnswer] = useState<string>(
        answersList[Math.floor(Math.random() * answersList.length)]
    );
    const [currWord, setCurrWord] = useState<string>(""); // used for typing letters in
    const [submitText, setSubmitText] = useState<string>("SUBMIT");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>("");
    const [didUserWin, setDidUserWin] = useState<boolean>(false);
    const [gamesCount, setGamesCount] = useState({
        wins: 0,
        losses: 0
    });

    // getting playSound function from our custom useSounds hook
    const playSound = useSounds();

    // defining strings for the submit and delete key labels
    const delString = "DEL";
    const submitString = "SUBMIT";
    const notWordString = "Not a word :(";
    const cheatString = "skrrr";

    // used to set key colours based on letters used/available
    // prettier-ignore
    const [keyColours, setKeyColours] = useState(startKeyColours);

    // onKeyPressed function
    const onKeyPressed = (symbol: string): void => {
        // code for the cheat lol
        if (symbol === "Q" && currWord === cheatString) {
            setCurrWord(answer);
        }

        if (symbol === delString) {
            // play keyboard sound
            playSound("key");

            // revert submit button colour + text if currWord is.length is 5 and not a word
            // this is because deleting a letter should remove the not a word text
            if (currWord.length === 5 && !allowedGuesses.includes(currWord)) {
                // change submit button text to SUBMIT
                setSubmitText(submitString);

                // change submit button colour to black
                const newKeyColours: KeyColours = {};
                for (const i in keyColours) {
                    newKeyColours[i] = i === submitString ? black : keyColours[i];
                }
                setKeyColours(newKeyColours);

                // re-enable submit button
                setIsSubmitDisabled(false);
            }

            // remove last character from currWord
            setCurrWord(currWord.slice(0, -1));
        } else if (currWord.length === 5) {
            if (symbol == submitString) {
                // NB: don't have to check if word is valid here because player cannot
                //     press submit if word is invalid (that check happens below)

                // play submit sound
                playSound("submit");

                // currWord matches answer, game over and player won
                if (currWord === answer) {
                    // play win sound
                    playSound("win");

                    // game is over
                    setGameOver(true);

                    // create win modal
                    setModalText("You Won!");
                    setDidUserWin(true);

                    // update gamesCount
                    setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
                }

                // player has run out of guesses, game over and player lost
                else if (state.indexOf(null) === 5) {
                    // play lose sound
                    playSound("lose");

                    // game is over
                    setGameOver(true);

                    // create lose modal
                    setModalText("You Lost :(");
                    setDidUserWin(false);

                    // update gamesCount
                    setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
                }

                // add guessed word to the state
                const nextEmptyIdx = state.indexOf(null);
                const newState = state.map((guess, idx) => {
                    return idx === nextEmptyIdx ? (currWord as Guess) : guess;
                });
                setState(newState as BoardState);

                // reset currWord to empty string (for new line of guesses)
                // will happen even if game is over but doesn't matter
                setCurrWord("");
            } else {
                // word maxed out, do nothing
                return;
            }
        } else if (symbol !== delString && symbol !== submitString) {
            // play keyboard sound
            playSound("key");

            // check if currWord is 4 letters before adding symbol
            // if it is, check validity of 5-letter word after adding symbol
            if (currWord.length === 4) {
                const temp = currWord.slice() + symbol.toLowerCase();
                if (!allowedGuesses.includes(temp)) {
                    // change submit button text to 'not a word'
                    setSubmitText(notWordString);

                    // change submit button colour to grey
                    const newKeyColours: KeyColours = {};
                    for (const i in keyColours) {
                        newKeyColours[i] = i === submitText ? grey : keyColours[i];
                    }
                    setKeyColours(newKeyColours);

                    // disable submit button
                    setIsSubmitDisabled(true);
                } else {
                    // change submit button text to SUBMIT
                    setSubmitText(submitString);

                    // change submit button colour to black
                    const newKeyColours: KeyColours = {};
                    for (const i in keyColours) {
                        newKeyColours[i] = i === submitText ? black : keyColours[i];
                    }
                    setKeyColours(newKeyColours);

                    // re-enable submit button
                    setIsSubmitDisabled(false);
                }
            }

            // add character to currWord
            setCurrWord(currWord + symbol.toLowerCase());
        }
    };

    const createNewGame = () => {
        // reset game state and currWord
        setState(startState);
        setCurrWord("");

        // choose a new answer word
        setAnswer(answers[Math.floor(Math.random() * answers.length)]);

        // set game over and didUserWin back to false
        setGameOver(false);
        setDidUserWin(false);

        // reset keyboard colours
        setKeyColours(startKeyColours);
    };

    return (
        <GradientBackground theme={theme}>
            <SafeAreaView style={styles.container}>
                <View style={styles.results}>
                    <View style={styles.resultsBox}>
                        <AmikoText style={styles.resultsText}>Played:</AmikoText>
                        <AmikoText style={styles.resultsCount}>
                            {gamesCount.wins + gamesCount.losses}
                        </AmikoText>
                    </View>
                    <View style={styles.resultsBox}>
                        <AmikoText style={styles.resultsText}>Win %:</AmikoText>
                        <AmikoText style={styles.resultsCount}>
                            {gamesCount.wins + gamesCount.losses === 0
                                ? 0
                                : (
                                      (gamesCount.wins * 100) /
                                      (gamesCount.wins + gamesCount.losses)
                                  ).toFixed()}
                        </AmikoText>
                    </View>
                </View>
                <Board
                    state={state}
                    answer={answer}
                    size={boardSize}
                    currWord={currWord}
                    keyColours={keyColours}
                />
                <Keyboard
                    onKeyPressed={(symbol) => onKeyPressed(symbol)}
                    boardSize={boardSize}
                    keyColours={keyColours}
                    submitText={submitText}
                    isSubmitDisabled={isSubmitDisabled}
                    gameOver={gameOver}
                />
                {gameOver && (
                    <View style={styles.modal}>
                        <AmikoText style={styles.modalText}>{modalText}</AmikoText>
                        <Image
                            style={[
                                styles.modalImage,
                                {
                                    marginLeft: didUserWin ? 15 : -55
                                }
                            ]}
                            source={
                                didUserWin
                                    ? require("@assets/dance1.gif")
                                    : require("@assets/sad1.gif")
                            }
                        />
                        <MyButton title="Play Again" onPress={createNewGame} />
                    </View>
                )}
            </SafeAreaView>
        </GradientBackground>
    );
}
