import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions
} from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings } from "@screens";

export type StackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const navigatorOptions: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: "#97D9E1"
    },
    headerTintColor: "black",
    headerTitleStyle: {
        fontFamily: "Amiko_600SemiBold",
        fontSize: 23
    },
    headerBackTitleStyle: {
        // fontFamily: "Amiko_400Regular"
        // fontSize: 10
    }
};

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen
                    name="SinglePlayerGame"
                    component={SinglePlayerGame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShadowVisible: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
