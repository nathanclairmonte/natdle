import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 40
    },
    field: {
        marginBottom: 30
    },
    switchField: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        color: "black",
        fontSize: 24
    },
    choiceList: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginHorizontal: -5
    },
    choiceButton: {
        backgroundColor: "white",
        padding: 10,
        paddingTop: 12,
        margin: 5,
        borderRadius: 3
    },
    choiceText: {
        color: "black",
        fontSize: 16
    },
    changePasswordText: {
        color: "black",
        fontSize: 24,
        textDecorationLine: "underline"
    }
});

export default styles;
