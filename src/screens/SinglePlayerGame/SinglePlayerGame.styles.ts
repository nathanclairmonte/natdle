import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modal: {
        position: "absolute",
        backgroundColor: "#fdcbf1",
        bottom: 60,
        left: 25,
        right: 25,
        padding: 30,
        borderWidth: 4,
        borderColor: "#C0C3FC",
        borderRadius: 10
    },
    modalText: {
        color: "black",
        fontSize: 28,
        textAlign: "center",
        marginBottom: 0
    },
    modalImage: {
        marginBottom: 10
    },
    results: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: -15
    },
    resultsBox: {
        borderWidth: 0,
        borderColor: "white",
        borderRadius: 4,
        backgroundColor: "rgba(0,0,0,0.5)",
        // backgroundColor: "black",
        // opacity: 0.6,
        padding: 10,
        paddingBottom: 6,
        marginHorizontal: 5
    },
    resultsText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        opacity: 1
    },
    resultsCount: {
        color: "white",
        textAlign: "center",
        fontSize: 22
    }
});

export default styles;
