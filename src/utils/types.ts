export type Guess = string | null;
export type BoardState = [Guess, Guess, Guess, Guess, Guess, Guess];

type KeyColoursKnown = {
    [q: string]: string;
    w: string;
    e: string;
    r: string;
    t: string;
    y: string;
    u: string;
    i: string;
    o: string;
    p: string;
    a: string;
    s: string;
    d: string;
    f: string;
    g: string;
    h: string;
    j: string;
    k: string;
    l: string;
    z: string;
    x: string;
    c: string;
    v: string;
    b: string;
    n: string;
    m: string;
    submit: string;
    del: string;
};
type KeyColoursUnknown = {
    [key: string]: string;
};
export type KeyColours = KeyColoursKnown | KeyColoursUnknown;
