export type Guess = string | null;
export type BoardState = [Guess, Guess, Guess, Guess, Guess, Guess];

type KeyColoursKnown = {
    [Q: string]: string;
    W: string;
    E: string;
    R: string;
    T: string;
    Y: string;
    U: string;
    I: string;
    O: string;
    P: string;
    A: string;
    S: string;
    D: string;
    F: string;
    G: string;
    H: string;
    J: string;
    K: string;
    L: string;
    Z: string;
    X: string;
    C: string;
    V: string;
    B: string;
    N: string;
    M: string;
    SUBMIT: string;
    DEL: string;
};
type KeyColoursUnknown = {
    [key: string]: string;
};
export type KeyColours = KeyColoursKnown | KeyColoursUnknown;
