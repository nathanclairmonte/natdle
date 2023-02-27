import React, { ReactElement } from "react";
import { AppBootstrap } from "@components";
import Navigator from "@config/Navigator";
import { SettingsProvider } from "@contexts/Settings-context";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <SettingsProvider>
                <Navigator />
            </SettingsProvider>
        </AppBootstrap>
    );
}
