import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "@contexts/Settings-context";

type SoundType = "key" | "submit" | "win" | "lose";
type PlaySoundFunction = (sound: SoundType) => void;

export default function useSounds(): PlaySoundFunction {
    // react references
    const keyboardSoundRef = useRef<Audio.Sound | null>(null);
    const submitSoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const loseSoundRef = useRef<Audio.Sound | null>(null);

    // get settings from settings context
    const { settings } = useSettings();

    // function to play sounds (adds haptics as well)
    const playSound = async (sound: SoundType): Promise<void> => {
        // object to map sound type to correct sound
        const soundsMap = {
            key: keyboardSoundRef,
            submit: submitSoundRef,
            win: winSoundRef,
            lose: loseSoundRef
        };

        try {
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
                status.isLoaded &&
                settings?.sounds &&
                soundsMap[sound].current?.replayAsync();
            settings?.haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (error) {
            console.log(error);
        }
    };

    // load sounds
    useEffect(() => {
        // load sounds once (when screen renders)
        const keyboardSoundObject = new Audio.Sound();
        const submitSoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const loseSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            /* eslint-disable @typescript-eslint/no-var-requires */
            await keyboardSoundObject.loadAsync(require("@assets/keyboard.wav"));
            keyboardSoundRef.current = keyboardSoundObject;
            await submitSoundObject.loadAsync(require("@assets/submit.wav"));
            submitSoundRef.current = submitSoundObject;
            await winSoundObject.loadAsync(require("@assets/win.wav"));
            winSoundRef.current = winSoundObject;
            await loseSoundObject.loadAsync(require("@assets/lose.wav"));
            loseSoundRef.current = loseSoundObject;
        };

        loadSounds();

        return () => {
            // will fire when component unmounts
            // unload sounds
            keyboardSoundObject && keyboardSoundObject.unloadAsync();
            submitSoundObject && submitSoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            loseSoundObject && loseSoundObject.unloadAsync();
        };
    }, []);

    return playSound;
}
