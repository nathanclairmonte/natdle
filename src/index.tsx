import React, { ReactElement } from "react";
import { AppBootstrap } from "@components";
import Navigator from "@config/Navigator";

export default function App(): ReactElement {
    return (
        <AppBootstrap>
            <Navigator />
        </AppBootstrap>
    );
}
