import React, {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useState,
    useEffect
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// object defining all possible game difficulties
const difficulties = {
    easy: "Easy Words",
    medium: "Medium Words",
    hard: "All Words"
};

// type difficultyKeyType = "easy" | "medium" | "hard";
// This type defines the possible options for the difficulty keys
// (i.e. keys of the difficulties object above)
// However, creating this type manually is technically unnecessary
// Instead, we can create it dynamically using the difficulties object itself.
// The difficulties object has a type (implicitly defined when we defined the object),
// which can be accessed by using "typeof difficulties". From this, we can then get the
// keys of this type, which correspond to the keys of the difficulties object.
// Therefore, using "keyof typeof difficulties" will give us the exact same
// difficultyKeyType that was manually defined above.

// type defining the required structure of the settings object
type SettingsType = {
    difficulty: keyof typeof difficulties;
    haptics: boolean;
    sounds: boolean;
};

// defining some default settings (note that it has a type of SettingsType)
const defaultSettings: SettingsType = {
    difficulty: "hard",
    haptics: true,
    sounds: true
};

// type defining the required structure of the SettingsContext
type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    updateSetting: <T extends keyof SettingsType>(settings: T, value: SettingsType[T]) => void;
};

// creating the SettingsContext variable
// (NB: it is initialized to undefined, so it's type is either the SettingsContextType
// or undefined)
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// helper function to create context variable with React's useContext hook
const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};

// helper function to create a SettingsProvider to wrap our app with
// this will allow us to access the context anywhere in the app
// this function will also retrieve the settings from AsyncStorage and
// use them to populate the settings context.
const SettingsProvider = (props: { children: ReactNode }): ReactElement => {
    // pieces of state
    const [settings, setSettings] = useState<SettingsType | null>(null);

    // function to load settings (either from AsyncStorage or just default)
    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("@settings");
            settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
        } catch (error) {
            setSettings(defaultSettings);
        }
    };

    // function to update and save a setting when it is changed on screen
    const updateSetting = async <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => {
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = { ...oldSettings, [setting]: value };
            await AsyncStorage.setItem("@settings", JSON.stringify(newSettings));
            setSettings(newSettings);
        } catch (error) {
            Alert.alert("Error!", "An error has occurred updating the settings");
        }
    };

    // this useEffect hook will run loadSettings once to retrieve settings
    // from AsyncStorage (or use the default ones if there are none in storage)
    useEffect(() => {
        loadSettings();
    }, []);

    // Finally, we return the <SettingsContext.Provider/> JSX.
    // This will allow us to access it in the root and wrap our app with it.
    // NB: We have added the {...props} here to ensure that the children that
    // are wrapped by this provider are included (i.e. our entire app will be child
    // of this provider, so without {...props} nothing will show up).
    // Also one last thing, the value is the context (i.e. what we will retrieve when
    // we call useSettings() anywhere)
    // Note that it follows the SettingsContextType defined above.
    return (
        <SettingsContext.Provider
            {...props}
            value={{
                settings: settings,
                updateSetting: updateSetting,
                loadSettings: loadSettings
            }}
        />
    );
};

export { useSettings, SettingsProvider, difficulties };
