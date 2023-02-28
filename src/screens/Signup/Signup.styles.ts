import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40
    },
    otpInputBox: {
        color: "black",
        fontFamily: "Amiko_400Regular",
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#6ECBD5",
        backgroundColor: "#FFE3FF",
        height: 55,
        paddingTop: 5
    },
    otpActiveInputBox: {
        borderColor: "black"
    },
    otpText: {
        color: "black",
        fontSize: 20
    },
    resendLink: {
        color: "black",
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 16
    }
});

export default styles;
