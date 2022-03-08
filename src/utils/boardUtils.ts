import { BoardState } from "@utils";

export const printFormattedBoard = (state: BoardState): void => {
    let formattedBoard = "---------------------\n";

    state.forEach((guess, guessIndex) => {
        if (guess) {
            guess.split("").forEach((letter, index) => {
                formattedBoard +=
                    index === 0 ? `| ${letter.toUpperCase()} |` : ` ${letter.toUpperCase()} |`;
            });
        } else {
            for (let index = 0; index < 5; index++) {
                formattedBoard += index === 0 ? `|   |` : `   |`;
            }
        }
        formattedBoard += "\n---------------------\n";
    });
    console.log(formattedBoard);
};

export const isBoardEmpty = (state: BoardState): boolean => {
    return state.every((guess) => guess === "     ");
};

export const isBoardFull = (state: BoardState): boolean => {
    return state.every((guess) => guess !== "     ");
};
